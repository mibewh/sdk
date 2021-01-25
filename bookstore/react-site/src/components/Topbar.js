import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Topbar extends Component {
  constructor(props) {
    super(props);
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.history.push(`/search?text=${this.state.searchText}`, this.state);
  }

  inputHandler = (event) => {
    const target = event.target;
    this.setState({
        searchText: target.value
    });
  }

  render() {
    return (
      <div className="Topbar">
        <Navbar bg='dark'>
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='mr-auto'>
              <Link to={`/`}>
                <Navbar.Brand>Quckstart Books</Navbar.Brand>
              </Link>
            </Nav>
            <Form inline onSubmit={this.submitHandler}>
              <FormControl type='text' placeholder='Search...' className='mr-sm-2' onChange={this.inputHandler} />
              <Button variant='outline-success'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(Topbar);