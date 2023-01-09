import { NavLink, useNavigate } from "react-router-dom";

interface Props {
  setIsLoggedIn(isLoggedIn: boolean): void;
}

function Navbar({ setIsLoggedIn }: Props) {
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div>
      <NavLink
        to="/"
        /* set end so it knows to only set activeStyle when route is deeply equal to link */
        end
        /* add styling to Navlink by adding a styled class */
        className="nav-link"
      >
        Dashboard
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
