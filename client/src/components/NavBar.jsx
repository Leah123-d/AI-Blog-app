import { NavLink} from "react-router-dom";

function NavBar() {
  return (
    <nav className="topnav">
      <h1 className="title">Code Leə </h1>
      <ul>
        <li className="active">
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create a Post</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
