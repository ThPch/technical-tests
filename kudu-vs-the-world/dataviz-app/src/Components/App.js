import React from 'react';
import './App.css';
import axios from 'axios';
import AntelopesTable from './Antelopes/AntelopesTable'
import AntelopePieChart from './Antelopes/AntelopePieChart';
import AntelopeBubbleChart from './Antelopes/AntelopeBubbleChart';
import AntelopeScatterChart from './Antelopes/AntelopeScatterChart';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken : '',
      antelopes : [],
      currentAntelope : {},
      showHideAntelopeCard : false,
      showLoginForm : false
    }
  }


  //When the component is mounted, we're gonna fetch the data from the API
  componentDidMount(){
    const url = 'http://localhost:3000/antelopes'

    axios.get(url, {
      headers : {
        "Access-Control-Allow-Origin": "*"
      },
      crossdomain: true
      })
      .then((res) => {
        this.setState({
          antelopes : res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })

  }


  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col s3">
          {this.state.antelopes.length > 1 &&
            <AntelopesTable antelopes={this.state.antelopes}/>
          }
          </div>

          <div className="col s9">
          {this.state.antelopes.length > 1 && (
            <AntelopePieChart antelopes={this.state.antelopes}/>
          )}
          </div>

          <div className="col s9">
          {this.state.antelopes.length > 1 && (
            <AntelopeBubbleChart antelopes={this.state.antelopes}/>
          )}
          </div>


          <div className="col s9">
          {this.state.antelopes.length > 1 && (
            <AntelopeScatterChart antelopes={this.state.antelopes}/>
          )}
          </div>
        </div>
      </div>
    );
    }
}

export default App;
