import React from "react";
import Link from "next/link";

const Navbar = () => (
  <nav className="navbar navbar-top-bar navbar-static-top">
    <div className="container">
      <ul className="navbar-nav nav">
        <li><Link href="/">Home</Link></li>
        <li className="disabled"><Link to="/">About Us</Link></li>
      </ul>
      <ul className="navbar-nav nav navbar-right">
        <li className="disabled"><a href="/">Login</a></li>
      </ul>
    </div>
  </nav>
)

export default Navbar
