// CSS
import './Search.css'

// Imports
import { BrowserRouter as Router, Link, Route,useNavigate } from "react-router-dom";
import { getTalk } from './SearchApi';
import Header from '../header/Header';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { ITalk } from '../../interface/ITalk';
import Talk from '../talk/Talk';
import { useState } from 'react';
import { hasContent } from '../../utils/utils';


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
  
  const [params, setParams] = useState<Params>({});

  
  const selectRandomTalk = async () => {
    //let idsArr = getTalksIds();
    // Hardcoding array of talk id's (warning, use valid ids)
    let idsArr = [1, 14];
    // Fetches random id    
    setTalk(await getTalk(idsArr[(Math.floor(Math.random() * idsArr.length))]));
    setFeelingLucky(true);    
  }
const onInputChange = () => {
  let searchBar = document.getElementById("search-bar") as HTMLInputElement;
  hasContent(searchBar.value) ? setParams({data:searchBar.value}) : setParams({data:searchBar.value})
}
  return (
    <>
      {feelingLucky ? <div id="search-header">
        <div id="talk-list-header">
          <Header />
          <div id="ham-menu-header">
            <HamburgerMenu />
          </div>
        </div>
      </div> : null
}
      <>
        {feelingLucky ? <Talk talk={talk} />
          : <div>
            <div id='main-content'>
              <h1 ><span className='glowing-txt'>TE<span className='faulty-letter'>CH </span>TALKS</span></h1>
              <input id='search-bar' placeholder='Search by title, author name, dates, etc...' 
              onChange={()=>onInputChange()}/>
              <br />
              <div id="buttons">
                <Link to={"/talk-list"} state={params} >
                <button className='glowing-btn'><span>S<span >E</span>ARCH</span></button>
                </Link>
                <button className='glowing-btn'><span onClick={selectRandomTalk}>I'M <span>FEE</span>LING </span>
                  <span onClick={selectRandomTalk}>LUC<span >KY</span></span>
                </button>
              </div>
            </div>
          </div>
        }
      </>

    </>
  );

};

export default Search;