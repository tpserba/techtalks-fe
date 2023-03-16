// @flow
import img_avatar from '../../images/img_avatar.png';
import './Talk.scss';
import '../../styles/Neon.scss'
import { ITalk } from '../../interface/ITalk';
import Header from "../header/Header";
import { useEffect, useState } from 'react';
import { hasContent } from '../../utils/utils';
import { useLocation , useNavigate} from 'react-router-dom';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { searchTalksByAuthor} from '../../Apis';

type Props = {
  talk: ITalk
};
type State = {

};
interface Params {
  "data"?: string
}

function Talk(props: Props) {
  const [urlsArray, setUrlsArray] = useState<string[]>([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  let regex = /http/;

  const handleAuthorClick = async() => {     
      navigate("/user-profile/"+state.talk.author?.id, {
        state:{ 
          author:state.author,
          talks:state.talks,
          talk:state.talk,
      }});  
  }
  useEffect(() => {
    console.log(state);
    if (hasContent(state.talk.resources)) {
      setUrlsArray(state.talk.resources!.split(" "));
    }     
      
  }, [])
  return (
    <div>
      <div id="talk-header">
      <Header />
      <HamburgerMenu />
      </div>
      <hr />
      <div id="talk-card">
        <div id="img-and-info">
          <img id="img_avatar-talk" src={img_avatar} alt="Avatar" />
          <h2 id="talk-title"><b><u>{state.talk.title}</u></b></h2>                  
            <p id="talk-author" onClick={() => handleAuthorClick()}><u><b>Author</b>: {state.talk.author?.authorName}</u></p>         
        </div>
        <hr />
        <br />
        <h3>{props.talk.description}</h3>
        <br />
        <iframe id="vid" width="560" height="315" src={state.talk.vidUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

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