
import '../../components/home/Home.css';
import '../../styles/Neon.css';
import '../../styles.css';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import Search from "../search/Search";
interface Props {

}

function Home(props: Props) {


  return (
    <>
      <div id="home-window">
        <div id="search-component">
          <Search />
        </div>
        <div id="ham-menu">
          <HamburgerMenu />
        </div>
      </div>
    </>
  );
}

export default Home;