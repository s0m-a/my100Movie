import { Link } from "react-router-dom";


function NavBar(){
    return(
      <div className="navBar">
        <> 
        <img src="/images/film.png" alt="movie logo" className="logo"  />
        <div className="links">
        <ul>
          <Link to = '/'>home</Link>
          <li> <a href="http://">rank</a> </li>
          <li> <a href="http://">movies</a> </li>
        
          <form className="d-flex">
    
          <Link to="/search" className="search"> search</Link>
  </form>
  
        </ul>
       </div>
        </>
  
  
  
  {/* <div className="profile">
  
  </div> */}
  <div>
  <Link to="/login">login</Link>


  </div>
  
  </div>
  
    )
  }
  export default NavBar;