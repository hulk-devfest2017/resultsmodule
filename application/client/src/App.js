import React, { Component } from 'react';

import './App.css';
import io from 'socket.io-client';

const socket = io()


class ResultRow extends React.Component {
  render(){
    return(
      <tr>
        <th scope="row">{this.props.score}</th>
        <td>{this.props.firstname}</td>
        <td>{this.props.lastname}</td>
      </tr>
    )
  }
}
class ResultTable extends React.Component {

  constructor() {
    console.log('constructor');
    super();
    this.state = {
      results: Array(0)
    };
  }

  componentWillMount(){
     console.log('componentWillMount');
      var self = this;
      socket.on('results', function (data) {
        console.log(data);
        console.log(self.state);
        console.log(self);
        var results = self.state.results.slice();
        results.push(JSON.parse(data));
        self.setState({results: results})
      });
  }


  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Score</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>

        { this.state.results.map(
          function(result) {
            return <ResultRow firstname={result.firstname} lastname={result.lastname} score={result.score}/>
          })
        }

        </tbody>
      </table>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <header>
            <h1>Results</h1>
          </header>
          <ResultTable />
        </div>
      </div>
    );
  }
}

export default App;
