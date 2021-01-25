import React from "react";
import Topbar from './Topbar'

const Layout = ({children}) => (
  <div className="wrapper">
    <header className="header">
      <Topbar />
    </header>  
    {children}
  </div>
)

export default Layout
