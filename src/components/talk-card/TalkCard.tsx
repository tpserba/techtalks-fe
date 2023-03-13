// @flow
import img_avatar from '../../images/img_avatar.png';
import { ITalkCardCard } from '../../interface/ITalkCard';
import './TalkCard.css';
import '../../styles/Neon.css'
import { Link, To, useNavigate } from 'react-router-dom';
import { getTalk } from '../search/SearchApi';
import { getFullTalk } from '../talk/TalkApi';
import React, { useState } from "react";
import { ITalk } from '../../interface/ITalk';
type Props = {
  talkCard: ITalkCardCard
};
type State = {

};
function TalkCard(props: Props, state: State) {
  const [talk, setTalk] = useState<ITalk>();
  const [navLink, setNavLink] = useState<To>("");
  const navigate = useNavigate();
  const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    /*
    await getFullTalk(props.talkCard.id).then((responseTalk) => {
      setTalk(responseTalk);
    });
    setNavLink("/talk/" + props.talkCard.id);
    //navigate("/talk/"+props.talkCard.id)
    */
  }
  return (
    <div onClick={(event) => handleOnClick(event)}>
      
      <div id="card">
        <img id="img_avatar" src={img_avatar} alt="Avatar" />
        <div id="card-info" >
          <h2><b><u>{props.talkCard.title}</u></b></h2>
          <p>{props.talkCard.description}</p>
          <p><u><b>Author</b>: {props.talkCard.author?.authorName}</u></p>
        </div>
      </div>      
    </div>
  );

};

export default TalkCard;