import React from 'react';
import axios from 'axios';

class UserCard extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          accessToken: '',
          currentUser : {},
          password: ''
      }

      this.submitForm = this.submitForm.bind(this);
      this.updatePswd = this.updatePswd.bind(this);
  }

  updatePswd = (evt) => {
    this.setState({
      password: evt.target.value
    });
  }


  submitForm = async (event) => {
      event.preventDefault();
      //console.log(this.state.currentUser)
      console.log(this.props)
      
      try{
          const response = await axios.post('http://localhost:5000/api/token',
          {
            "email": this.props.currentUser.email,
            "password": this.state.password
          },
            {
              headers: {
              'Content-Type': 'application/json'
              }
            }
          )
          
          let accessTokenRes = await response.data.accessToken
          this.setState({ accessToken: accessTokenRes })
          this.props.accessToken(accessTokenRes)
  
      }
      catch(err){
          alert(err)
      }
    }

  render(){
    return (
      <form className="col s12" onSubmit={this.submitForm.bind(this)}>
        <div className="col s12 m7">
          <h2 className="header"> <strong>ID : {this.props.currentUser._id}</strong> </h2>
          <div className="card horizontal">
            <div className="card-stacked col s12">
              <div className="card-content">
                <p><strong>Email : </strong>{this.props.currentUser.email}</p>
              </div>
              <div className="card-action col s12">
                <a className="col s6" href="#">{this.props.currentUser.name}</a>
                <input type="password" id="password" value ={this.state.password} onChange={this.updatePswd}/>
                
                <button className="waves-effect waves-light btn-small" type="submit"
              name="action">update Token</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
 
export default UserCard;