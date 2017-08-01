import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class ResultRow extends React.Component {
  render(){
    return(
      <tr>
        <td>{this.props.score}</td>
        <td>{this.props.firstname}</td>
        <td>{this.props.lastname}</td>
      </tr>
    )
  }
}
class ResultTable extends React.Component {

  constructor() {
    super();
    this.state = {
      results: Array(0)
    };

    this.state.results.push({"firstname":"toto","lastname":"dfsdfd","score":300});
    this.state.results.push({"firstname":"titi","lastname":"dfsdfd","score":100});

  }


  render() {
    return (
      <table class="table table-striped">
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ResultTable />
      </div>
    );
  }
}

export default App;
