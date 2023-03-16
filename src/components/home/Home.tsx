
import '../../components/home/Home.scss';
import '../../styles/Neon.scss';
import '../../styles.scss';
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
        <div>
        
        </div>
        <div id="ham-menu">
          <HamburgerMenu />
        </div>        
      </div>
    </>
  );
}

export default Home;