// @flow
import img_avatar from '../../images/img_avatar.png';
import { ITalkCardCard } from '../../interface/ITalkCard';
import './AuthorCard.css';
import '../../styles/Neon.css'
import { Link, To, useNavigate } from 'react-router-dom';
import { getTalk } from '../search/SearchApi';
import { getFullTalk } from '../talk/TalkApi';
import React, { useState } from "react";
import { ITalk } from '../../interface/ITalk';
import { IAuthor } from '../../interface/IAuthor';
type Props = {
  authorCard: IAuthor
};
type State = {

};
function AuthorCard(props: Props, state: State) {
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
          <h2><b><u>{props.authorCard.authorName}</u></b></h2>
          <p>{props.authorCard.email}</p>
          
        </div>
      </div>      
    </div>
  );

};

export default AuthorCard;