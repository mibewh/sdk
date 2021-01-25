import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import SearchPage from './pages/SearchPage';
import Layout from './components/Layout';


var DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
  DEV_URL = 'http://localhost:3000';
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [{}]
    };
  }
  componentDidMount() {
    // Call self-hosted API to get users response
    
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Layout>
            <Switch>
              <Route exact path={`/`} component={HomePage} />
              <Route path={`/book/:id`} component={BookPage} />
              <Route path={`/search`} component={SearchPage} />
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  }
}
export default App;