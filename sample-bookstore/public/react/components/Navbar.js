import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-top-bar navbar-static-top">
    <div className="container">
      <ul className="navbar-nav nav">
        <li><Link to="/">Home</Link></li>
        <li className="disabled"><Link to="/">About Us</Link></li>
      </ul>
    </div>
    <ul className="navbar-nav nav navbar-right">
      <li className="disabled"><a href="#">Login</a></li>
      <li>
        <form className="navbar-form" method="get" action="search.html">
          <div className="form-group">
            <input name="text" type="text" className="form-control" placeholder="Search"></input>
          </div>
          <button type="submit" className="btn btn-default btn-search">Search</button>
        </form>
      </li>
    </ul>
  </nav>
)

export default Navbar
