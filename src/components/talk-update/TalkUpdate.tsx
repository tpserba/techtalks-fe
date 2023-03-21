import React, { useState, useEffect, useRef } from "react";
import { IAuthor } from "../../interface/IAuthor";
import { ITalk } from "../../interface/ITalk";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import Header from "../header/Header";
import './TalkUpdate.scss';
import { getAuthorByEmail, saveTalk, updateTalk } from '../../Apis';
import img_avatar from '../../images/img_avatar.png';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../datepicker-css/datepicker.scss';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import Select from 'react-select'
import { hasContent } from "../../utils/utils";
registerLocale('es', es)
interface Props {

}

interface Source {
  "id": number,
  "url": string
}
function TalkUpdate(props: Props) {
  // Setup
  const [justLanded, setJustLanded] = useState<boolean>(false);
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
    // Sets the urls
    for (let i = 0; i < resourceList.length; i++) {
      if (resourceList.length === 0 || resourceList === undefined) {
        // Does nothing since n sources were added
      } else {
        // Only adds url if it doesn't exist in the urls string already
        if (!urls.includes(resourceList[i].url)) {
          //setUrls(urls + " g" + resourceList[i].url);
        }

      }
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasContent(talkDate)) {
      setIsDateSet(true);
    }
    // Prevents component from rerendering and losing data inserted by the user in the form    
    if (!hasContent(author)) {
      alert("No author selected");
      setReadyToSave(false);
      return;
    } else {
      let resourceCount;
      let sources: string = "";
      if (document.querySelectorAll('[id^="input-resource"]').length !== 0) {
        resourceCount = document.querySelectorAll('[id^="input-resource"]'); //document.querySelector('[id^="input-resource-"]')!.id;  
        for (let i = 0; i < resourceCount.length; i++) {
          // Prevents from saving space (empty resource inputs)
          if ((resourceCount[i] as HTMLInputElement).value) {
            sources += (resourceCount[i] as HTMLInputElement).value + " ";
          }

        }
      }
      setUrls(sources);
      setReadyToSave(true);
    }


  }

  const handleAuthor = (authorName: string) => {
    if (authorName != "") {
      setSelectedAuthor(authorName);
      handleAuthorAsyncPart(authorName);

    }
  }

  const handleAuthorAsyncPart = async (authorName: string) => {
    let splitAuthorName = authorName.split("/");
    // 0 is name, 1 is email which is unique
    testAuthor = await getAuthorByEmail(splitAuthorName[1])
    setAuthor(await getAuthorByEmail(splitAuthorName[1]));
    setGotAuthor(true);
  }

  const handleOnDateSelect = async (event: Date) => {
    document.getElementById("talk-update-datepicker")?.click();
    setTalkDate(new Date(event));
  }


  useEffect(() => {
    let resourcesArr = state.talk.resources.split(" ");
    let counterContent: number[] = [];
    let resourceListContent: Source[] = [];
    for (let i = 0; i < resourcesArr.length; i++) {
      counterContent.push(i);
    }
    setCounter(counterContent);
    for (let i = 0; i < resourcesArr.length; i++) {
      resourceListContent.push(
        {
          id: i,
          url: resourcesArr[i]
        }
      )
    }
    setResourceList(resourceListContent);

    
    // Waits until all the inputs are rendered (when the amount of selectors is equal to the number of resources in the array, it loops)
    if (justLanded && resourcesArr.length > 0 && document.querySelectorAll('[id^="input-resource"]') === resourcesArr.length) {
      for (let i = 0; i < resourcesArr.length; i++) {        
        (document.getElementById("input-resource" + (i)) as HTMLInputElement).value = resourcesArr[i];
      }
    }
    if (!justLanded) {
      (document.getElementById("update-input-title") as HTMLInputElement).value = state.talk.title;
      (document.getElementById("update-input-description") as HTMLTextAreaElement).value = state.talk.description;
      (document.getElementById("update-input-vid-url") as HTMLTextAreaElement).value = state.talk.vidUrl;      
      (document.getElementById("update-input-description") as HTMLInputElement).value = state.talk.description;   
      //(document.getElementById("update-input-icon") as HTMLInputElement).value = state.talk.description;      
      (document.getElementById("talk-update-datepicker") as HTMLInputElement).value = state.talk.talkDate.toString();
      setJustLanded(true);
    }



    let authorsArr = state.authors;
    let newArr = []
    let timezoneInfo: string = "0100";
    for (let i = 0; i < state.authors.length; i++) {
      newArr.push({
        value: authorsArr[i].authorName + "/" + authorsArr[i].email,
        label: authorsArr[i].authorName + "/" + authorsArr[i].email
      })
    }
    setSelectOptions(newArr);

    if (gotAuthor && readyToSave) { //readyToSave was here before as condition   
      //setTalkDate(new Date((document.getElementById("talk-update-datepicker") as HTMLInputElement).value));
      if (hasContent(talkDate)) {
        if (talkDate?.toString().includes("GMT+0200")) {
          timezoneInfo = "0200"
        }
      }
      const callUpdate = async () => {
        let talkToSave: ITalk = {
          id: state.talk.id,
          title: title,
          description: description,
          author: author,
          resources: urls,
          talkDate: new Date((document.getElementById("talk-update-datepicker") as HTMLInputElement).value),//talkDate,
          vidUrl: vidUrl,
          talkIcon: talkIcon,
          timezoneInfo: timezoneInfo,
        };
     
        await updateTalk(talkToSave);
        alert("Talk created successfully!");
        navigate("/");
      }
      callUpdate();
    } else {
      setReadyToSave(false);
    }

  }, [urls, author, gotAuthor, readyToSave, justLanded])




  // Start
  return (
    <>
      <div id="talk-update-window" ref={talkAddWindow}>
        <div id="talk-update-header">
          <Header />
          <HamburgerMenu />
        </div>
        <button onClick={() => (document.getElementById("input-resource1") as HTMLInputElement).value = "whatever"}>CLICK ME</button>
        <div>
          <form id="update-form-main" onSubmit={(event => onSubmit(event))}>
            <h1>Update Talk</h1>
            <label id="update-lbl-title" className="lbl" htmlFor="">Talk Title</label>
            <input id="update-input-title" type="text" name="title"
              placeholder="EDA Architecture, ES6 JS for beginners, etc..."
              onInput={(event) => setTitle((event.target as HTMLInputElement).value)}
            />


            <label htmlFor="update-input-description" className="lbl">Description</label>
            <textarea id="update-input-description" name="input-description" rows={4} cols={80} maxLength={255}
              onInput={(event) => setDescription((event.target as HTMLInputElement).value)} />


            <label htmlFor="update-input-vid-url" className="lbl">Embed video url</label>
            <textarea id="update-input-vid-url" name="input-vid-url" rows={4} cols={80} maxLength={1000}
              onInput={(event) => setVidUrl((event.target as HTMLInputElement).value)} />



            <label htmlFor="talk-update-author-select" className="lbl">Author</label>
            <Select id="talk-update-author-select"
              inputValue=""
              options={selectOptions}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,

              }}
              onInputChange={(event) => handleAuthor(event)}
              onChange={(event) => handleAuthor(event!.value)}
              onKeyDown={() => {

              }} />



            <label htmlFor="input-resources" className="lbl">Resources</label>
            <div id="update-resources">
              {
                counter.map((c, index) => {
                  let resource = "";
                  
                  // Checks if any input elements are created. Otherwise tries to assign to null, since the operation happens before than the creation of the input elements
                  if(justLanded && resourceList.length > 0 && document.querySelectorAll('[id^="input-resource"]').length > 0){
                    (document.getElementById("input-resource"+index) as HTMLInputElement).value = resourceList[index].url;                                        
                  }            
                  
                  return (
                    <>
                      <input id={"input-resource" + index} key={index} className="input input-resources"
                        type="text" name="resource" placeholder="Link/url"
                        onInput={(event) => { storeInputValue(event, index) }}
                        onChange={(event) => { storeInputValue(event, index) }}
                        onBlur={(event) => { storeInputValue(event, index) }}                                              
                      />

                      <br />
                    </>
                  )
                })

              }
              <button id="update-input-srcs-btn" type="button"
                onClick={(event) => addResource(event)}

              >+</button>
            </div>
            <img id="update-upload-img" src={img_avatar} />
            <button>Upload icon</button>
            <DatePicker id="talk-update-datepicker"
              locale="es"
              showTimeInput
              shouldCloseOnSelect={false}
              dateFormat="yyyy-MM-dd p"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              onSelect={(event) => handleOnDateSelect(event)} />
            <input type="submit" value="Submit" className="glowing-btn btn-submit" />

          </form>
        </div>

      </div>
    </>
  );
}

export default TalkUpdate;