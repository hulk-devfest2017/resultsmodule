import React, { Component } from 'react';

import './App.css';


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
    super();
    this.state = {
      results: Array(0)
    };

    this.state.results.push({"firstname":"toto","lastname":"dfsdfd","score":300});
    this.state.results.push({"firstname":"titi","lastname":"dfsdfd","score":100});

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
