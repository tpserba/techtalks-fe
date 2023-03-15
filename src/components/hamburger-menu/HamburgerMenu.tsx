// @flow
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HamburgerMenu.css'
import '../../styles.css';
import { useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAlignRight, faS } from '@fortawesome/free-solid-svg-icons';
type Props = {

};
type State = {

};
function HamburgerMenu(props: Props, state: State) {
  library.add(faS, faAlignRight)
  const navigate = useNavigate();
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

  const navTo = (compo: string) => {
    switch (compo) {
      case "add":
        navigate("/add-talk");
        break;
      case "home":
        navigate("/");
        break;
    }
  }

  return (
    <div id="ham-menu">
      <div id="mySidenav" className="sidenav">
        <a href="" className="closebtn" onClick={closeNav}>&times;</a>
        <a onClick={() => navTo("home")}>Home</a>
        <a href="#">Profile</a>
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