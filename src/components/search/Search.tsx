// @flow
//import { library } from '@fortawesome/fontawesome-svg-core';
//import { faS, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import './Search.css'
import { useNavigate } from "react-router-dom";

import { useState } from 'react';

import { getTalk } from './SearchApi';
import { ITalk } from '../../interface/ITalk';

type Props = {

};
type State = {

};
function Search(props: Props, state: State) {
  const [talk, setTalk] = useState<ITalk>();

  const navigate = useNavigate();
  const selectTitles = async () => {
    navigate("/talk-list");
  }
  const selectRandomTalk = async () => {
    //let idsArr = getTalksIds();
    // Hardcoding array of talk id's (warning, use valid ids)
    let idsArr = [1, 14];
    // Fetches random id    
    setTalk(await getTalk(idsArr[(Math.floor(Math.random() * idsArr.length))]));        
  }

  return (
    <>
      <>
        <div>
          <div id='main-content'>
            <h1 ><span className='glowing-txt'>TE<span className='faulty-letter'>CH </span>TALKS</span></h1>
            <input id='search-bar' placeholder='Search by title, author name, dates, etc...' />
            <br />
            <div id="buttons">
              <button className='glowing-btn'><span onClick={selectTitles}>S<span >E</span>ARCH</span></button>
              <button className='glowing-btn'><span onClick={selectRandomTalk}>I'M <span>FEE</span>LING </span>
                <span onClick={selectRandomTalk}>LUC<span >KY</span></span>
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );

};

export default Search;