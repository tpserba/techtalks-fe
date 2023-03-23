// @flow
import img_avatar from '../../images/img_avatar.png';
import './Talk.scss';
import '../../styles/Neon.scss'
import { ITalk } from '../../interface/ITalk';
import Header from "../header/Header";
import { useEffect, useState } from 'react';
import { hasContent } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { deleteTalk, getAuthors } from '../../Apis';
import { IAuthor } from '../../interface/IAuthor';

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

  const handleAuthorClick = async () => {
    navigate("/user-profile/" + state.talk.author?.id, {
      state: {
        author: state.author,
        talks: state.talks,
        talk: state.talk,
      }
    });
  }
  useEffect(() => {
    if (hasContent(state.talk.resources)) {
      setUrlsArray(state.talk.resources!.split(" "));
    }

  }, [])

  const handleTalkDelete = () => {
    if (window.confirm("Confirm delete talk?")) { // Add locale string in the future
      deleteTalk(state.talk.id)
      alert("Talk deleted successfully");
      navigate("/");
    }
  }

  const onHandleEditClick = async () => {
    let authorsArr = await getAuthors();
    let resourcesArr = state.talk.resources.split(" ");
    if(resourcesArr.length > 1) resourcesArr.pop();
    navigate("/talk-update/" + state.talk.id,
      {
        state: {
          author: state.author,
          authors: authorsArr,
          talks: state.talks,
          talk: state.talk,
          resources: resourcesArr,
          
        }
      })
  }
  return (
    <div>
      <div id="talk-header">
        <Header />
        <HamburgerMenu />
      </div>
      <hr />
      <div id="talk-component">

        <div id="img-and-info">
          <img id="img_avatar-talk" src={img_avatar} alt="Avatar" />
          <h2 id="talk-title"><b><u>{state.talk.title}</u></b></h2>
          <h3 id="btn-talk-author" onClick={() => handleAuthorClick()} className='faulty-letter'><b>Author</b>: {state.talk.author?.authorName}</h3>
        </div>
        <div>
          <hr />
        </div>
        <br />
        <h3>{props.talk.description}</h3>
        <br />
        <div id="talk-content">
          <iframe id="vid" width="560" height="315" src={state.talk.vidUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <br />
          <br />
          <br />
        </div>
        <div>
          <hr />
        </div>
        <br />
        <div id="btns">
          <button id="btn-update" className='glowing-btn' onClick={onHandleEditClick}>Edit talk</button>
          <button id="btn-delete" className='glowing-btn'
            onClick={() => { handleTalkDelete() }}
          >
            Delete talk </button>
        </div>
        <br />
        <div id="resources-list">
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
    </div>
  );

};

export default Talk;