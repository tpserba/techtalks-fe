import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import { IAuthor } from "../../interface/IAuthor";
import { ITalk } from "../../interface/ITalk";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import Header from "../header/Header";
import './TalkUpdate.scss';
import { getAuthorByEmail, updateTalk } from '../../Apis';
import img_avatar from '../../images/img_avatar.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { hasContent } from "../../utils/utils";

/*
State contains
author
authors,
talks,
talk,
resources
*/
interface Props {

}

interface Source {
  "id": number,
  "url": string
}

interface State {
  authors: IAuthor[],
  author: IAuthor,
  talks: ITalk[],
  talk: ITalk,

}
function TalkUpdate(props: Props) {
  // Setup
  const [justLanded, setJustLanded] = useState<boolean>(false);
  const [counter, setCounter] = useState<string[]>([]);
  const [resourceList, setResourceList] = useState<Source[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  let talkAddWindow = useRef<HTMLDivElement>(null);


  const addResource = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCounter([...counter, ""]);
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents component from rerendering and losing data inserted by the user in the form    
    event.preventDefault();
    let optionsList: NodeListOf<HTMLOptionElement> = document.querySelectorAll('[id^="update-option-"]');
    let matchesAuthorName = false;    
    for (let i = 0; i < optionsList.length; i++) {   
      // Checks if the author in the input matches one in the list
      if (optionsList[i].value === (document.getElementById("talk-update-author-input") as HTMLInputElement).value) {
        matchesAuthorName = true;
      }
    }
    // Checks if the author input has content and if it matches an author name in the db
    if (!hasContent((document.getElementById("talk-update-author-input") as HTMLInputElement).value)
      || !matchesAuthorName
    ) {
      alert("No author selected. An author from the list must be selected to save the talk.");
      return;
    } else {
      // Makes a list of all the resource input elements and saves the strings in a string variable
      let resourceCount: NodeListOf<Element>;
      let sources: string = "";
      if (document.querySelectorAll('[id^="update-input-resource"]').length !== 0) {
        resourceCount = document.querySelectorAll('[id^="update-input-resource"]');
        for (let i = 0; i < resourceCount.length; i++) {
          // Checks if the array consists of only 1 element or if i is in the last position, in both cases the last element of the array would be blank space,
          // so it avoids concatenating it
          if ((resourceCount[i] as HTMLInputElement).value && (resourceCount.length === 1 || i === resourceCount.length - 1)) {
            sources += (resourceCount[i] as HTMLInputElement).value;
          } else if ((resourceCount[i] as HTMLInputElement).value) {
            sources += (resourceCount[i] as HTMLInputElement).value + " ";
          }

        }
      }

      // Select the author from the authors array received from navigating and saved in state y comparing the email.
      let chosenAuthor: IAuthor = {};
      let inputAuthorValue = (document.getElementById("talk-update-author-input") as HTMLInputElement).value;
      // Separates email
      let authorEmail = inputAuthorValue.split("/")[1];
      let timezoneInfo: number = -60;
      for (let i = 0; i < state.authors.length; i++) {
        if (state.authors[i].email === authorEmail) {
          chosenAuthor = state.authors[i];
        }
      }
      let dateToSave = new Date((document.getElementById("talk-update-datepicker") as HTMLInputElement).value);
      // Checks if a date has been input         
      if (!hasContent(dateToSave)) {
        dateToSave = new Date("2023-01-01T00:00");
      }
      let dateObj: Date = dateToSave; 
      if (dateObj.getTimezoneOffset() === -60) {
        timezoneInfo = -60
      } else if (dateObj.getTimezoneOffset() === -120) {
        timezoneInfo = -120
      }


      let talkToSave: ITalk = {
        id: state.talk.id,
        title: (document.getElementById("talk-update-input-title") as HTMLInputElement).value,
        description: (document.getElementById("talk-update-input-description") as HTMLInputElement).value,
        author: chosenAuthor,
        resources: sources,
        talkDate: dateToSave,
        vidUrl: (document.getElementById("talk-update-input-vid-url") as HTMLInputElement).value,
        talkIcon: "",
        timezoneInfo: timezoneInfo,
      };
      await updateTalk(talkToSave);
      alert("Talk updated successfully!");
      navigate("/");     
    }




  }

  const handleOnDateSelect = async (event: SyntheticEvent<HTMLInputElement, Event>) => {
    document.getElementById("talk-update-datepicker")?.click();
    let dateTarget = event.target as HTMLInputElement;    
    //setTalkDate(new Date(dateTarget.value));
  }


  useEffect(() => {
    let adjustedTime: Date;   
    // check if null
    (document.getElementById("talk-update-input-title") as HTMLInputElement).value = state.talk.title;
    (document.getElementById("talk-update-input-description") as HTMLInputElement).value = state.talk.description;
    (document.getElementById("talk-update-author-input") as HTMLInputElement).value = state.author.authorName+"/"+state.author.email;    
    //resources: sources,
    if(parseInt(state.talk.timezoneInfo) === -60){
      adjustedTime = new Date( state.talk.talkDate);
      adjustedTime.setHours(adjustedTime.getHours()+1);
      state.talk.talkDate = new Date(adjustedTime);  

    } else if (parseInt(state.talk.timezoneInfo) === -120){
      adjustedTime = new Date( state.talk.talkDate);
      adjustedTime.setHours(adjustedTime.getHours()+2);
      state.talk.talkDate = new Date(adjustedTime);  
    }    
       
    (document.getElementById("talk-update-datepicker") as HTMLInputElement).value = state.talk.talkDate.toISOString().substring(0,10)+ "T"+ state.talk.talkDate.toISOString().substring(11,16);
    (document.getElementById("talk-update-input-vid-url") as HTMLInputElement).value = state.talk.vidUrl;
    (document.getElementById("update-upload-img") as HTMLInputElement).value = "";
    //timezoneInfo: timezoneInfo,    
    setCounter(state.resources);
   
   
  }, [])




  // Start
  return (
    <>
      <div id="talk-update-window" ref={talkAddWindow}>
        <div id="talk-update-header">
          <Header />
          <HamburgerMenu />
        </div>        
        <div>
          <form id="talk-update-form-main" onSubmit={(event => onSubmit(event))}>
            <h1>Update Talk</h1>
            <label id="talk-update-lbl-title" className="lbl" htmlFor="">Talk Title</label>
            <input id="talk-update-input-title" type="text" name="title"
              placeholder="EDA Architecture, ES6 JS for beginners, etc..."

            />


            <label htmlFor="talk-update-input-description" className="lbl">Description</label>
            <textarea id="talk-update-input-description" name="input-description" rows={4} cols={80} maxLength={255}
            />


            <label htmlFor="talk-update-input-vid-url" className="lbl">Embed video url</label>
            <textarea id="talk-update-input-vid-url" name="input-vid-url" rows={4} cols={80} maxLength={1000}
            />

            <label htmlFor="talk-update-author-input-list" className="lbl">Author</label>
            <datalist id="talk-update-author-input-list">
              {state.authors.map((authorItem: IAuthor) => {
                return <option id={"update-option-"+authorItem.id?.toString()}>{authorItem.authorName+"/"+authorItem.email}</option>
              })}

            </datalist>
            <input id="talk-update-author-input" autoComplete="on" list="talk-update-author-input-list" />
            
            <label htmlFor="update-input-resources" className="lbl">Resources</label>
            <div id="update-resources">
              {
                counter.map((c, index) => {
                  return (
                    <>
                      <input id={"update-input-resource" + index} key={index} className="update-input update-input-resources"
                        type="text" name="resource" placeholder="Link/url"
                        defaultValue={state.resources[index]}
                      />

                      <br />
                    </>
                  )
                })
              }
            </div>
            <button id="update-input-srcs-btn" type="button"
              onClick={(event) => addResource(event)}

            >+</button>

            <img id="update-upload-img" src={img_avatar} alt="Picture about the subject of the Talk" title="Picture about the subject of the Talk" />
            <button>Upload icon</button>



            <label htmlFor="start">Start date:</label>
            <input type="datetime-local" id="talk-update-datepicker" name="trip-start"
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

export default TalkUpdate;