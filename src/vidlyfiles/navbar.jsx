import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!user && (
                <NavLink className="nav-link" to="/Register">
                  Register
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink className="nav-link" to="/myprofile">
                  {user.name}
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
/*<ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/posts/2018/06">Posts</Link>
            </li>
            <li>
                <Link to="/admin">Admin</Link>
            </li>
        </ul>*/

export default NavBar;
