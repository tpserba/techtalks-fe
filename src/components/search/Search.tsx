// CSS
import './Search.css'

// Imports
import { BrowserRouter as Router, Link, Route, useNavigate } from "react-router-dom";
import Header from '../header/Header';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { useEffect, useState } from 'react';
import { getFullTalk } from '../../Apis';

type Props = {

};
type State = {

};

interface Params {
  "data"?: string
}
function Search(props: Props, state: State) {
  const [talk, setTalk] = useState<ITalk>({});
  const [talks, setTalks] = useState<ITalk[]>([]);
  const [feelingLucky, setFeelingLucky] = useState<boolean>(false);
  const navigate = useNavigate();
  const [params, setParams] = useState<Params>({});


  const selectRandomTalk = async () => {
    //let idsArr = getTalksIds();
    // Hardcoding array of talk id's (warning, use valid ids)
    let idsArr = [1, 14];
    // Fetches random id    
    setTalk(await getFullTalk(idsArr[(Math.floor(Math.random() * idsArr.length))]));
    setFeelingLucky(true);
  }
  const onInputChange = () => {
    let searchBar = document.getElementById("search-bar") as HTMLInputElement;
    setParams({ data: searchBar.value });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      document.getElementById("link-to-talklist")?.click();
    }
  }

  const handleSearchClick = () => {    
    navigate("/talk-list", { state: params })
  }

  useEffect(() => {
    if (feelingLucky) {
      console.log("felt lucky")
           
      navigate("/talk/" + talk.id, {state: {talk:talk}});
    }
  }, [feelingLucky])
  return (
      <>
        {<div>
            <div id='main-content'>
              <h1 ><span className='glowing-txt'>TE<span className='faulty-letter'>CH </span>TALKS</span></h1>
              <input id='search-bar' placeholder='Search by title, author name, dates, etc...'
                onChange={() => onInputChange()}
                onKeyDown={(event) => handleKeyDown(event)}
                autoFocus={true} />
              <br />
              <div id="buttons">
                <button className='glowing-btn' onClick={() => handleSearchClick()}><span>S<span >E</span>ARCH</span></button>
                <button className='glowing-btn' onClick={() => selectRandomTalk()}><span>I'M <span>FEE</span>LING </span>
                  <span >LUC<span >KY</span></span>
                </button>
              </div>
            </div>
          </div>
        }

    </>
  );

};

export default Search;