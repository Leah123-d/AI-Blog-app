import { Outlet, Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="topnav">
      <h1 className="title">Code Leə </h1>
      <ul>
        <li className="active">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/create">Create a Post</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
