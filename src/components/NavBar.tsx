import { Link } from 'react-router-dom';
import '../components/NavBar.css';

function NavBar() {
  return (
    <div className="NavBar">
        <div className="rightSide">
            <Link to="/contact"> Contact Us </Link>
            <Link to="/log-in"> Log in </Link>
        </div>
        <div className="logo">WriteOffTrack</div>
       </div>
  );
}


export default NavBar



