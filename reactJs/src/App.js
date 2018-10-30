import React, { Component } from 'react'
import './App.css'

var gitana = require("gitana");

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
 }
  
 componentDidMount() {
  var th = this;
  var results = [];
  gitana.connect(function(err) {
   if (err) {
       console.log("");
       console.log("There was a problem connecting to Cloud CMS");
       console.log(err);
       process.exit();
   }
   this.datastore("content").readBranch("master").queryNodes({
     "_type": "my:author"
 }).each(function(){
   results.push(this)}).then(function(){
   console.log("results", results);
   th.setState({
      data: results
 });
});
});
}

 componentWillUnmount() {
   this.serverRequest.abort();
 }

 render() {
  return (
    <div className="container">
    <div className="row">
       <div className="col-md-6 col-md-offset-5">
           <h1 className="title">All Authors</h1>
           <table>
           <tr>
             <th>Author title</th>
             <th></th>
             <th></th>
             <th></th>
             <th>Author Gender</th> 
             <th></th>
             <th></th>
             <th></th>
             <th>Author Image</th> 
           </tr>
           {
             this.state.data.map(items => ( console.log("items",items),<tr>
            <td>{items.title}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{items.Gender}</td>
            <td></td>
            <td></td>
            <td></td>
            <td><img height='150' width='150'src={"http://localhost/proxy/repositories/" + items.getRepositoryId() + "/branches/" + items.getBranchId() + "/nodes/" + items.Image.id + "/attachments/default"}/></td>
            </tr>),
        )}
             </table>
          </div>
       </div>
     </div>
   );
  } 
}
export default App


