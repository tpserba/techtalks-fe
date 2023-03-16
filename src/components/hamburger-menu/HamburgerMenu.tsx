// @flow
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HamburgerMenu.scss'
import '../../styles.scss';
import { useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAlignRight, faS } from '@fortawesome/free-solid-svg-icons';
import { getAuthors } from '../../Apis';
import { useEffect, useState } from 'react';
import { IAuthor } from '../../interface/IAuthor';
type Props = {

};
type State = {

};
function HamburgerMenu(props: Props, state: State) {
  library.add(faS, faAlignRight)
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<IAuthor[]>([])
  const [gotAuthors, setGotAuthors] = useState<boolean>(false)
  const closeNav = () => {
    let mySideNav: HTMLElement | null = document.getElementById("mySidenav");
    if (mySideNav === null) {
    } else {
      mySideNav.style.width = "0";
    }
  }

  const openNav = () => {
    let mySideNav = document.getElementById("mySidenav");
    if (mySideNav === null) {
    } else {
      mySideNav.style.width = "250px";
    }
  }

  const navTo = async (compo: string) => {
    switch (compo) {
      case "add":
        setAuthors(await getAuthors());
        setGotAuthors(true);
        break;
      case "home":
        navigate("/");
        break;
      case "profile":
        navigate("/user-profile" + 9999);
        break;
    }
  }
  useEffect(() => {
    if (gotAuthors) {
      navigate("/add-talk", {
        state: {
          authors: authors,
        }
      });
    }

  }, [authors])
  return (
    <div id="ham-menu">
      <div id="mySidenav" className="sidenav">
        <a href="" className="closebtn" onClick={closeNav}>&times;</a>
        <a onClick={() => navTo("home")}>Home</a>
        <a onClick={() => navTo("profile")}>Profile</a>
        <a onClick={() => navTo("add")}>Create Talk</a>
        <a href="#">About</a>
        <a href="#">Log out</a>
      </div>
      <div id='hamburger-menu'>
        <FontAwesomeIcon icon={["fas", "align-right"]} size={"2xl"} color="white" onClick={openNav} />
      </div>
    </div>
  );
};

export default HamburgerMenu;