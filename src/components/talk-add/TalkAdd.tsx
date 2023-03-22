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
  const [counter, setCounter] = useState<number[]>([]);
  const [resourceList, setResourceList] = useState<Source[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<IAuthor>({});
  const [gotAuthor, setGotAuthor] = useState<boolean>(false);
  const [urls, setUrls] = useState<string>("");
  const [canClickSubmit, setCanClickSubmit] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [readyToSave, setReadyToSave] = useState<boolean>(false);
  const [isDateSet, setIsDateSet] = useState<boolean>(false);
  const [selectedAuthor, setSelectedAuthor] = useState<string>();
  const [vidUrl, setVidUrl] = useState<string>();
  const [talkIcon, setTalkIcon] = useState<string>();
  const [talkDate, setTalkDate] = useState<Date>();
  const { state } = useLocation();
  const navigate = useNavigate();
  let talkAddWindow = useRef<HTMLDivElement>(null);
  let testAuthor: IAuthor;
  //const selectOptions = [];
  const [selectOptions, setSelectOptions] = useState<{ value: string, label: string }[]>();

  const addResource = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCounter([...counter, (counter.length + 1)]);
  }
  const storeInputValue = (event: React.FormEvent<HTMLInputElement>, srcKey: number) => {
    //event.preventDefault();
    let target: HTMLInputElement = event.target as HTMLInputElement;
    let value = target.value;
    let source = {
      "id": srcKey,
      "url": value
    }
    let newResourceList = [...resourceList];
    let exists = newResourceList.filter((item) => item["id"] === srcKey);
    // Checks if item exists in the array alrady
    if (exists.length === 0) {
      setResourceList([...newResourceList, source]);
    } else {
      newResourceList.map((item) => {
        return (
          item.id === srcKey ? item.url = value : null
        )
      }
      );
      setResourceList([...newResourceList]);
    }

  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents component from rerendering and losing data inserted by the user in the form    
    event.preventDefault();
    if (hasContent(talkDate)) {
      setIsDateSet(true);
    }

    if (!hasContent(author)) {
      alert("No author selected");
      setReadyToSave(false);
      return;
    } else {
      let resourceCount: NodeListOf<Element>;
      let sources: string = "";
      if (document.querySelectorAll('[id^="input-resource"]').length !== 0) {
        resourceCount = document.querySelectorAll('[id^="input-resource"]');
        for (let i = 0; i < resourceCount.length; i++) {
          // Prevents from saving space (empty resource inputs)
          if ((resourceCount[i] as HTMLInputElement).value && (resourceCount.length === 1 || i === resourceCount.length - 1)) {
            sources += (resourceCount[i] as HTMLInputElement).value;
          } else if ((resourceCount[i] as HTMLInputElement).value) {
            sources += (resourceCount[i] as HTMLInputElement).value + " ";
          }

        }
      }
      setUrls(sources);
      setReadyToSave(true);
    }


  }

  const handleOnDateSelect = async (event: SyntheticEvent<HTMLInputElement, Event>) => {
    document.getElementById("talk-add-datepicker")?.click();
    let dateTarget = event.target as HTMLInputElement;
    setTalkDate(new Date(dateTarget.value));
  }


  useEffect(() => {
    let authorsArr = state.authors;
    let newArr = []
    let timezoneInfo: string = "0100";
    for (let i = 1; i < state.authors.length; i++) {
      newArr.push({
        value: authorsArr[i].authorName + "/" + authorsArr[i].email,
        label: authorsArr[i].authorName + "/" + authorsArr[i].email
      })
    }
    setSelectOptions(newArr);

    if (gotAuthor && readyToSave) { //readyToSave was here before as condition   
      //setTalkDate(new Date((document.getElementById("talk-add-datepicker") as HTMLInputElement).value));
      if (hasContent(talkDate)) {
        if (talkDate?.toString().includes("GMT+0200")) {
          timezoneInfo = "0200"
        }
      }

      // Select the author from the authors array received from navigating and saved in state y comparing the email.
      let chosenAuthor: IAuthor = {};
      let inputAuthorValue = (document.getElementById("talk-add-author-input") as HTMLInputElement).value;
      // Separates email
      let authorEmail = inputAuthorValue.split("/")[1];
      for (let i = 0; i < state.authors.length; i++) {
        if (state.authors[i].email === authorEmail) {        
          console.log("should be the chosen email "  + chosenAuthor)  
          chosenAuthor = state.authors[i];
        }
      }
      const callSave = async () => {
        let talkToSave: ITalk = {
          title: (document.getElementById("talk-add-title") as HTMLInputElement).value,
          description: description,
          author: chosenAuthor,
          resources: urls,
          talkDate: new Date((document.getElementById("talk-add-datepicker") as HTMLInputElement).value),//talkDate,
          vidUrl: vidUrl,
          talkIcon: talkIcon,
          timezoneInfo: timezoneInfo,
        };
        await saveTalk(talkToSave);
        alert("Talk created successfully!");
        navigate("/");
      }
      callSave();
    } else {
      setReadyToSave(false);
    }

  }, [urls, author, readyToSave])




  // Start
  return (
    <>
      <div id="talk-add-window" ref={talkAddWindow}>
        <div id="talk-add-header">
          <Header />
          <HamburgerMenu />
        </div>
        <div>
          <form id="form-main" onSubmit={(event => onSubmit(event))}>
            <h1>Create a Talk</h1>
            <label id="lbl-title" className="lbl" htmlFor="">Talk Title</label>
            <input id="talk-add-input-title" type="text" name="title"
              placeholder="EDA Architecture, ES6 JS for beginners, etc..."
              onInput={(event) => setTitle((event.target as HTMLInputElement).value)}
            />


            <label htmlFor="input-description" className="lbl">Description</label>
            <textarea id="input-description" name="input-description" rows={4} cols={80} maxLength={255}
              onInput={(event) => setDescription((event.target as HTMLInputElement).value)} />


            <label htmlFor="input-vid-url" className="lbl">Embed video url</label>
            <textarea id="input-vid-url" name="input-vid-url" rows={4} cols={80} maxLength={1000}
              onInput={(event) => setVidUrl((event.target as HTMLInputElement).value)} />




            <label htmlFor="talk-add-author-input-list" className="lbl">Author</label>
            <datalist id="talk-add-author-input-list" >
              {state.authors.map((authorItem: IAuthor) => {
                console.log("hey")
                return <option key={"option"+authorItem.id?.toString()} 
                id={"option"+authorItem.id?.toString()} 
                value={authorItem.authorName+"/"+authorItem.email}
                 />
              })}

            </datalist>
            <input id="talk-add-author-input" autoComplete="on" list="talk-add-author-input-list" 
            onSelect={(event)=>console.log(event)}
            />



            <label htmlFor="input-resources" className="lbl">Resources</label>
            <div id="resources">

              {counter.map((c, index) => {
                return (
                  <>
                    <input id={"input-resource" + c} key={c} className="input input-resources"
                      type="text" name="resource" placeholder="Link/url"
                      onInput={(event) => { storeInputValue(event, c) }}
                      onChange={(event) => { storeInputValue(event, c) }}
                      onBlur={(event) => { storeInputValue(event, c) }} />
                    <br />
                  </>
                )
              })}
              <button id="input-srcs-btn" type="button"
                onClick={(event) => addResource(event)}

              >+</button>
            </div>
            <img id="upload-img" src={img_avatar} />
            <button>Upload icon</button>
            <label htmlFor="start">Start date:</label>
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