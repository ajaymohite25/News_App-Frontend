import React from "react";
import "./cssFiles/navBar.css";
import { Link } from "react-router-dom";
import store from "../redux/store";

function Navbar() {
  function SignOut() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <h3 className="navbartitle">
          <Link to="/">News Time</Link>
        </h3>

        <div className="navbarmenus">
          {window.gapi.auth2.getAuthInstance().isSignedIn.get() ? (
            <span className="navLink navName">
              Hello,{store.getState().auth.name}
            </span>
          ) : (
            ""
          )}

          <Link className="navLink" to="news_page">
            All News
          </Link>

          {window.gapi.auth2.getAuthInstance().isSignedIn.get() ? (
            <Link className="navLink" to="saved_news">
              Saved News
            </Link>
          ) : (
            ""
          )}

          {window.gapi.auth2.getAuthInstance().isSignedIn.get() ? (
            <Link onClick={SignOut} className="navLink" to="/">
              Sign Out
            </Link>
          ) : (
            <Link className="navLink" to="/signin">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
