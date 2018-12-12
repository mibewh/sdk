import Header from './Header'

const Layout = (props) => (
  <div className="wrapper">
    <Header />    
    {props.children}
  </div>
)

export default Layout
