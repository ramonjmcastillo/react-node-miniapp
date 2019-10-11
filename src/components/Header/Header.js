import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../auth0/react-auth0-wrapper";

import logo from "../../assets/images/reactMovie_logo.png";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img className="rmdb-logo" src={logo} alt="rmdb-logo" />
        </Link>
        <div className="link-container">
          <Link className="link-items" to="/search">
            Browse
          </Link>

          <Link className="link-items" to="/profile">
            Profile
          </Link>
          {/* <Link className="link-items" to="/login">
            LogIn
          </Link> */}
          <Link to="/external-api">External API</Link>
          <div>
            {!isAuthenticated && (
              <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && (
              <button onClick={() => logout()}>Log out</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
