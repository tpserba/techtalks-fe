// @flow
import img_avatar from '../../images/img_avatar.png';
import './Talk.css';
import '../../styles/Neon.css'
import { ITalk } from '../../interface/ITalk';
import Header from "../header/Header";
import { useEffect, useState } from 'react';
import { hasContent } from '../../utils/utils';


type Props = {
  talk: ITalk
};
type State = {

};

function Talk(props: Props, state: State) {
  const [urlsArray, setUrlsArray] = useState<string[]>([]);
  let regex = /http/;

  useEffect(() => {

    if (hasContent(props.talk.resources)) {
      console.log(props.talk.resources);
      setUrlsArray(props.talk.resources!.split(" "));
    }

  }, [])
  return (
    <div>
      <div id="talk-card">
        <div id="img-and-info">
          <img id="img_avatar" src={img_avatar} alt="Avatar" />
         
          <h2 id="talk-title"><b><u>{props.talk.title}</u></b></h2>
          <p id="talk-author"><u><b>Author</b>: {props.talk.author?.authorName}</u></p>
         
        </div>
        <hr />
        <br />
        <h3>{props.talk.description}</h3>
        <br />
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

        <br />
        <br />
        <br />


        <hr />
        <h2>Resources:</h2>

        {urlsArray.map((url) => {
          return (
            <div>
              <a href={url.match(regex) ? url : "http://" + url} target="_blank" id="talk-url">{url}</a>
              <br />
              <br />
            </div>
          )
        })}

      </div>
    </div>
  );

};

export default Talk;