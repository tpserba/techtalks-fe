import React, { useState, useEffect, useRef, MutableRefObject, LegacyRef } from "react";
import { IAuthor } from "../../interface/IAuthor";
import { ITalk } from "../../interface/ITalk";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";
import Header from "../header/Header";
import './AddTalk.css';
import { saveTalk } from "./AddTalkApi";

interface Props {

}

interface Source {
  "id": number,
  "url": string
}
function AddTalk(props: Props) {
  const [counter, setCounter] = useState<number[]>([]);
  const [resourceList, setResourceList] = useState<Source[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<IAuthor>({});
  const [urls, setUrls] = useState<string>("");
  const [canClickSubmit, setCanClickSubmit] = useState<boolean>(false);
  let addTalkWindow = useRef<HTMLDivElement>(null);

  const addResource = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCounter([...counter, (counter.length + 1)]);

    console.log(Array.from(Array(counter)));
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
    console.log("just assigned value to newResourceList ");
    console.log(newResourceList);
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
        console.log("this is the arr:" + i)
        console.log(resourceList);
        console.log("this is urls");
        console.log(urls)
        // Only adds url if it doesn't exist in the urls string already
        if (!urls.includes(resourceList[i].url)) {
          setUrls(urls + " " + resourceList[i].url);
        }

      }
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents component from rerendering and losing data inserted by the user in the form
    event.preventDefault();
   
   
    console.log("active element")
    console.log(document.activeElement)
    console.log(addTalkWindow.current)
    
    if (document.activeElement === addTalkWindow.current) {

      console.log("yes")
    } else {
      console.log("no")
    }

    let talkToSave: ITalk = {
      title: title,
      description: description,
      author: author,
      resources: urls
    };
    await saveTalk(talkToSave);
    console.log("this is the submitted talk:");
    console.log(talkToSave);
  }

  const handleAuthor = (authorName: string) => {
    // Create author object and add it to Talk

  }
  const focus = () => {
    addTalkWindow.current!.focus();
    addTalkWindow.current?.focus();
  }
  /*
    useEffect(()=> {
      setCanClickSubmit(true);
    }, [resourceList])
  */
  useEffect(() => {
    focus();
  }, [onSubmit])
  /*<form id="form-main" onSubmit={canClickSubmit ? (event => onSubmit(event)) : (()=>{})}>*/
  return (
    <>
      <div id="add-talk-window" ref={addTalkWindow}>
        <div id="add-talk-header">
          <Header />
          <HamburgerMenu />
        </div>

        <div>
          <form id="form-main" onSubmit={(event => onSubmit(event))}>
            <h1>Create a Talk</h1>
            <label id="lbl-title" className="lbl" htmlFor="">Talk Title</label>
            <input id="input-title" className="input" type="text" name="title"
              placeholder="EDA Architecture, ES6 JS for beginners, etc..."
              onInput={(event) => setTitle((event.target as HTMLInputElement).value)}
            />


            <label htmlFor="input-description" className="lbl">Description</label>
            <textarea id="input-description" name="input-description" rows={4} cols={80} maxLength={255}
              onInput={(event) => setDescription((event.target as HTMLInputElement).value)} />

            <label htmlFor="input-author" className="lbl">Author !!</label>
            <input id="input-author" className="input" type="text" name="author"
              placeholder="Will be gathered from session"
              onInput={(event) => handleAuthor((event.target as HTMLInputElement).value)} />

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
              <button id="input-resources-btn" type="button"
                onClick={(event) => addResource(event)}
                onKeyUp={() => focus()}
                onChange={() => focus()}
                onBlur={() => focus()}
              >+</button>
            </div>
            <input type="submit" value="Submit" className="glowing-btn btn-submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTalk;