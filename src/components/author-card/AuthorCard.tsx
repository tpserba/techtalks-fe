// @flow
import img_avatar from '../../images/img_avatar.png';

import './AuthorCard.scss';
import '../../styles/Neon.scss'
import { Link, To, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { ITalk } from '../../interface/ITalk';
import { IAuthor } from '../../interface/IAuthor';
type Props = {
  authorItem: IAuthor
  talks: ITalk[]
};
type State = {

};
function AuthorCard(props: Props, state: State) { 
  const handleOnClick = async (event: React.MouseEvent<HTMLDivElement>) => {
   
  }
  return (
    
    <div onClick={(event) => handleOnClick(event)}>      
      <div id="author-card">
        <img id="author-img_avatar" src={img_avatar} alt="Avatar" />
        <div id="author-card-info" >
          <h2><b><u>{props.authorItem.authorName}</u></b></h2>
          <p>{props.authorItem.email}</p>          
        </div>
      </div>      
    </div>
    
  );

};

export default AuthorCard;