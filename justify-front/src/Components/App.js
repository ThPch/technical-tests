import React from 'react';
import './App.css';
import axios from 'axios';
import LoginForm from './Login/LoginForm';
import UsersList from './User/UsersList'
import UserCard from './User/UserCard';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken : '',
      users : [],
      currentUser : {},
      showHideUserCard : false,
      showLoginForm : false
    } 

    //Way to make sure that we can use this on a class
    this.updateCurrentUser = this.updateCurrentUser.bind(this);

  }

  //When the component is mounted, we're gonna fetch the data from the API
  componentDidMount(){
    const url = 'http://localhost:5000/api/users'

    axios.get(url, { 
      headers : {
        "Access-Control-Allow-Origin": "*"
      },
      crossdomain: true
      })
      .then((res) => {
        
        this.setState({
          users : res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

  updateToken = (data) =>{
    this.setState({accessToken: data, showLoginForm:true})
    alert("Token Updated");
  }

  updateCurrentUser(item){
    this.setState({
      currentUser : item,
      showHideUserCard : true
    })
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
        <nav>
          <div className="nav-wrapper blue darken-4">
            <a href="#" className="brand-logo">Justify Machine</a>
          </div>
        </nav>
        </div>
        <div className="row">
          <div className="col s3">
            <UsersList users={this.state.users}
          updateCurrentUser={this.updateCurrentUser}/>
          </div>
          <div className="col s9">
          {this.state.showHideUserCard && (
            <UserCard currentUser={this.state.currentUser} accessToken={this.updateToken}/>
          )}
          </div>
        </div>
        <div className="row">
        {this.state.showLoginForm && (
            <div className="col s12"><LoginForm accessToken={this.state.accessToken}/></div>
        )}
        </div>
      </div>
    );
    }
}

export default App;
