import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/articles'>Articles</Link>
        </li>

        {user && <li>{user.email}</li>}
      </ul>
    </nav>
  );
};

export default NavBar;
