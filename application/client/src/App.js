import React, { Component } from 'react';

import './App.css';
import 'bootstrap-css'
import io from 'socket.io-client';

const socket = io()


class ResultRow extends React.Component {

  render(){
    return(
      <tr style={{"animation" : "fadeIt 10s ease-in-out"}} id={this.props.id}>
        <th scope="row" style={{width:"10%"}}>
          {this.props.score}
        </th>
        <td style={{width:"10%"}}>
          <img alt="hero" className="hero-image" src={"images/ranks/rank_" + this.props.rank + ".png"} />
        </td>
        <td style={{width:"80%", textAlign:"left"}}>
          {this.props.playerName}
        </td>
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
  }

  componentWillMount(){
    let self = this;
    socket.on('results', function (data) {
      console.log("New result !", data);
      let results = self.state.results.slice();
      results = [JSON.parse(data)].concat(results);
      self.setState({results: results});
    });
  }


  render() {
    return (
      <table className="table table-striped" id="results">
        <thead>
          <tr>
            <th style={{width:"10%", "textAlign":"center"}}>Score</th>
            <th style={{width:"90%"}} colSpan="2">Player</th>
          </tr>
        </thead>
        <tbody>

        { 
          this.state.results.map((result, index) => {
            let playerName = result.firstname
            if(result.lastname && result.lastname !== "undefined") {
              playerName += " " + result.lastname.substring(0,1).toUpperCase() + "."
            }
            return <ResultRow playerName={playerName} score={result.score} id={result.id} rank={result.rank} key={result.id} />
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
        <div><img src="images/sqli.gif" alt="SQLI" height="100px" width="auto"/> </div>
        <div className="container">
          <header>
            <h1>DevFest Hulk Challenge 2017</h1>
          </header>
          <ResultTable />
        </div>
      </div>
    );
  }
}

export default App;
