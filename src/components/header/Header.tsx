
import './Header.scss';
import { useNavigate } from "react-router-dom";
interface Props {

}

function Header(props: Props) {
  const navigate = useNavigate();
const goHome = () => {
navigate("/");
}
  
  return (
    <>
     <h1 id="header-main" onClick={goHome}><span className='glowing-txt'>TE<span className='faulty-letter'>CH </span>TALKS</span></h1>
    </>
  );
}

export default Header;