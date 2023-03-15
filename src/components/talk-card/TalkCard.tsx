// @flow
import img_avatar from '../../images/img_avatar.png';
import { format }from 'date-fns';
import { ITalkCardCard } from '../../interface/ITalkCard';
import './TalkCard.css';
import '../../styles/Neon.css'
import {To, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { ITalk } from '../../interface/ITalk';
import { hasContent } from '../../utils/utils';
type Props = {
  talkCard?: ITalkCardCard,
  talk?: ITalk
  type?: string,
};
type State = {

};
function TalkCard(props: Props, state: State) {
  // Setup
  const [talk, setTalk] = useState<ITalk>();
  const [navLink, setNavLink] = useState<To>("");
  const navigate = useNavigate();
  



  // Star
  const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    /*
    await getFullTalk(props.talkCard.id).then((responseTalk) => {
      setTalk(responseTalk);
    });
    setNavLink("/talk/" + props.talkCard.id);
    //navigate("/talk/"+props.talkCard.id)
    */
  }
  // Checks if the talk has a date
  let dateStorage: Date= (new Date(2000, 1, 1 ));
  if(props.type === "talk"){
    if(hasContent(props.talk?.talkDate)){
      dateStorage = props.talk!.talkDate!;
    }
  } else if (props.type === "card") {
    if(hasContent(props.talkCard?.talkDate)){
      dateStorage = props.talkCard!.talkDate!;
    }
  }

  return (
    <div onClick={(event) => handleOnClick(event)}>
      
      <div id="card">
        <img id="img_avatar" src={img_avatar} alt="Avatar" />
        <div id="card-info" >
          <h2><b><u>{props.type === "talk" ?   props.talk?.title :props.talkCard?.title}</u></b></h2>
          <p>{props.type === "talk" ? props.talk?.description : props.talkCard?.description}</p>
          <p>{props.type === "card" ? format(new Date(dateStorage), 'do MMMM Y') : format(new Date(dateStorage), 'do MMMM Y')}</p>
          <p><u><b>Author</b>: {props.type === "talk" ? props.talk?.author?.authorName : props.talkCard?.author?.authorName}</u></p>
        </div>
      </div>      
    </div>
  );

};

export default TalkCard;