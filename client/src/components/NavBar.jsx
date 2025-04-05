function NavBar() {
  return (
    
    <div className="topnav">
      <h1 className="title">Code Leə </h1>
      <a className="active" href="#home">
        Home 
      </a>
      <a href="#news">Posts</a>
      <a href="#contact">Create a Post</a>
      <div className="topnav-right">
        <a><input type="date"/></a>
        <a href="#search">Search</a>
        <a href="#about">About</a>
      </div>
      
    </div>
  );
}

export default NavBar;
