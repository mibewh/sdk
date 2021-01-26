import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';

import { Redirect } from 'react-router';

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
  DEV_URL = 'http://localhost:3000';
}

class ResourcePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: undefined
    }
  }

  determineResourceRoute() {
    let { id } = this.props.match.params;
    let params = queryString.parse(this.props.location.search); 
    axios.get(`${DEV_URL}/api/resources/${id}`, { params, withCredentials: true }).then((res) => {
      
      let document = res.data;
      let url = "/";

      if (document._type === "store:book")
      {
        url = "/book/" + document._doc;
      }

      this.setState({
        redirectUrl: url
      });
    });
  }

  componentDidMount() {
    this.determineResourceRoute();
  }

  render() {

    if (this.state.redirectUrl)
    {
      return <Redirect to={this.state.redirectUrl}></Redirect>
    }
    else
    {
      return <div></div>
    }
  }

}

export default ResourcePage;