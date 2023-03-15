// CSS
import './Search.css'

// Imports
import { BrowserRouter as Router, Link, Route, useNavigate } from "react-router-dom";
import Header from '../header/Header';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { useEffect, useState } from 'react';
import { getFullTalk, searchTalksByAuthor, getTalksIds } from '../../Apis';


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
  const [talksIds, setTalksIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const [params, setParams] = useState<Params>({});
  const [gotTalk, setGotTalk] = useState<boolean>(false);
  const [gotTalkIds, setGotTalkIds] = useState<boolean>(false);


  const selectRandomTalk = async () => {  
    // Hardcoding array of talk id's (warning, use valid ids)    
    let randomId = talksIds[Math.floor(Math.random() * talksIds.length) + 1];
    // Fetches random id    
    
    setTalk(await getFullTalk(randomId));
    //setTalks(await searchTalksByAuthor(randomId));
    setGotTalk(true);
    setFeelingLucky(true);

  }
  const onInputChange = () => {
    let searchBar = document.getElementById("search-bar") as HTMLInputElement;
    setParams({ data: searchBar.value });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  }

  const handleSearchClick = () => {
    navigate("/talk-list", { state: params })
  }

  useEffect(() => {   
    if (!gotTalkIds) {
      const getAllIds = async () => {
        setTalksIds(await getTalksIds());
      }
      getAllIds();
      setGotTalkIds(true);
    }

    // Doesn't  get list of author's talks before the async call to get back a Talk by id is finished
    if (gotTalk) {
      const getAllTalks = async () => {
        setTalks(await searchTalksByAuthor(talk.author?.id!));
      }
      getAllTalks();
    }

    if (feelingLucky && talks.length > 0 && Object.keys(talk).length > 0) {      
      navigate("/talk/" + talk.id, { state: { author: talk.author, talks: talks, talk: talk } });
    }
  }, [talks, talk])
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