import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import { IAuthor } from "../../interface/IAuthor";
import { ITalk } from "../../interface/ITalk";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import Header from "../header/Header";
import './TalkAdd.scss';
import { getAuthorByEmail, saveTalk } from '../../Apis';
import img_avatar from '../../images/img_avatar.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { hasContent } from "../../utils/utils";

/*
state includes
authors,
author,
talks,
talk
*/
interface Props {

}

interface Source {
  "id": number,
  "url": string
}
function TalkAdd(props: Props) {
  // Setup
  const [counter, setCounter] = useState<string[]>([]);
  const [resourceList, setResourceList] = useState<Source[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  let talkAddWindow = useRef<HTMLDivElement>(null);
  const [selectOptions, setSelectOptions] = useState<{ value: string, label: string }[]>();

  const addResource = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCounter([...counter, ""]);
  }


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents component from rerendering and losing data inserted by the user in the form    
    event.preventDefault();
    let optionsList: NodeListOf<HTMLOptionElement> = document.querySelectorAll('[id^="add-option-"]');
    let matchesAuthorName = false;
    for (let i = 0; i < optionsList.length; i++) {
      if (optionsList[i].value === (document.getElementById("talk-add-author-input") as HTMLInputElement).value) {
        matchesAuthorName = true;
      }
    }

    if (!hasContent((document.getElementById("talk-add-author-input") as HTMLInputElement).value)
      || !matchesAuthorName
    ) {
      alert("No author selected. An author from the list must be selected to save the talk.");

      return;
    } else {
      // Makes a list of all the resource input elements and saves the strings in a string variable
      let resourceCount: NodeListOf<Element>;
      let sources: string = "";
      if (document.querySelectorAll('[id^="add-input-resource"]').length !== 0) {
        resourceCount = document.querySelectorAll('[id^="add-input-resource"]');
        for (let i = 0; i < resourceCount.length; i++) {
          // Prevents from saving space (empty resource inputs)
          if ((resourceCount[i] as HTMLInputElement).value && (resourceCount.length === 1 || i === resourceCount.length - 1)) {
            sources += (resourceCount[i] as HTMLInputElement).value;
          } else if ((resourceCount[i] as HTMLInputElement).value) {
            sources += (resourceCount[i] as HTMLInputElement).value + " ";
          }

        }
      }

      // Select the author from the authors array received from navigating and saved in state y comparing the email.
      let chosenAuthor: IAuthor = {};
      let inputAuthorValue = (document.getElementById("talk-add-author-input") as HTMLInputElement).value;
      // Separates email
      let authorEmail = inputAuthorValue.split("/")[1];
      let timezoneInfo: number = -60;
      for (let i = 0; i < state.authors.length; i++) {
        if (state.authors[i].email === authorEmail) {
          chosenAuthor = state.authors[i];
        }
      }
      let dateToSave = new Date((document.getElementById("talk-add-datepicker") as HTMLInputElement).value);
      // Checks if a date has been input         
      if (!hasContent(dateToSave)) {
        dateToSave = new Date("2002-03-02T23:12:34.001+07:05");
      }
      let dateObj: Date = dateToSave;
      if (dateObj.getTimezoneOffset() === -60) {
        timezoneInfo = -60
      } else if (dateObj.getTimezoneOffset() === -120) {
        timezoneInfo = -120
      }


      let talkToSave: ITalk = {
        title: (document.getElementById("talk-add-input-title") as HTMLInputElement).value,
        description: (document.getElementById("talk-add-input-description") as HTMLInputElement).value,
        author: chosenAuthor,
        resources: sources,
        talkDate: new Date(dateToSave),
        vidUrl: (document.getElementById("talk-add-input-vid-url") as HTMLInputElement).value,
        talkIcon: "",
        timezoneInfo: timezoneInfo,
      };
      await saveTalk(talkToSave);
      alert("Talk created successfully!");
      navigate("/");
    }


  }

  const handleOnDateSelect = async (event: SyntheticEvent<HTMLInputElement, Event>) => {
    document.getElementById("talk-add-datepicker")?.click();

    let dateTarget = event.target as HTMLInputElement;
  }

  // Start
  return (
    <>
      <div id="talk-add-window" ref={talkAddWindow}>
        <div id="talk-add-header">
          <Header />
          <HamburgerMenu />
        </div>
        <div>
          <form id="talk-add-form-main" onSubmit={(event => onSubmit(event))}>
            <h1>Create a Talk</h1>
            <label id="talk-add-lbl-title" className="lbl" htmlFor="">Talk Title</label>
            <input id="talk-add-input-title" type="text" name="title"
              className="add-input"
              placeholder="EDA Architecture, ES6 JS for beginners, etc..."

            />


            <label htmlFor="talk-add-input-description" className="lbl">Description</label>
            <textarea id="talk-add-input-description" name="talk-add-input-description"
              className="add-textarea"
              rows={4} cols={80} maxLength={255}
            />


            <label htmlFor="talk-add-input-vid-url" className="talk-add-lbl">Embed video url</label>
            <textarea id="talk-add-input-vid-url" name="talk-add-input-vid-url"
              className="add-textarea"
              rows={4} cols={80} maxLength={1000}
            />




            <label htmlFor="talk-add-author-input-list" className="lbl">Author</label>
            <datalist id="talk-add-author-input-list" >
              {state.authors.map((authorItem: IAuthor) => {
                return <option
                  key={"add-option-" + authorItem.id?.toString()}
                  id={"add-option-" + authorItem.id?.toString()}
                  value={authorItem.authorName + "/" + authorItem.email}
                />
              })}

            </datalist>
            <input id="talk-add-author-input" className=" add-input" autoComplete="on" list="talk-add-author-input-list"
            />



            <label htmlFor="add-input-resource" className="lbl"><u>Resources</u></label>
            <div id="resources">

              {counter.map((c, index) => {
                return (
                  <>
                    <input id={"add-input-resource" + index} 
                    key={index} className="add-input add-input-resources"
                      type="text" name="resource" placeholder="Link/url"
                    />
                    <br />
                  </>
                )
              })}
              <div id="talk-add-add-resource-button">
                <button id="talk-add-input-srcs-btn" type="button"
                  onClick={(event) => addResource(event)}
                  className="glowing-btn_noflicker"
                >Add resource +</button>
                <label htmlFor="talk-add-add-input-srscs-btn"></label>
              </div>
            </div>
            <img id="upload-img" src={img_avatar} />
            <button className="glowing-btn_noflicker">Upload icon</button>
            <label htmlFor="start">Date(click calendar icon):</label>
            <input type="datetime-local" id="talk-add-datepicker" name="trip-start"
              min="2000-01-01" max="2100-12-31"
              onChange={(event) => handleOnDateSelect(event)}
              onSelect={(event) => handleOnDateSelect(event)}
            />
            <input type="submit" value="Submit" className="glowing-btn btn-submit" />

          </form>
        </div>

      </div>
    </>
  );
}

export default TalkAdd;