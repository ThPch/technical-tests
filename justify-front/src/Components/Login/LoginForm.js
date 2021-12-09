import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            textJustify: "",
            textJustified : "",
            accessToken : ""
        }

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submitForm = async (event) => {
        event.preventDefault();
        let accessToken = this.props.accessToken
        axios.defaults.headers.common['Authorization'] =`Bearer ${accessToken}`;
        
        try{
            const response = await axios.post('http://localhost:5000/api/justify',{data: this.state.textJustify})
            this.state.textJustified = await response.data
            this.setState({ textJustified: this.state.textJustified })
        }
        catch(err){
            console.log(err)
        }
        
        
    }

    handleChange(event) {
        this.setState({textJustify: event.target.value});
    }

    render() { 
        return ( 
        <form className="col s12" onSubmit={this.submitForm.bind(this)}>
              <div className="row">
                <div className="input-field col s6">
                  <textarea id="textJustify" name="textJustify" className="materialize-textarea" placeholder="Paste your text here"
                   onChange={this.handleChange}></textarea>
                  <label htmlFor="textJustify" >Texte à justifier :</label>
                </div>
                <div className="input-field col s6">
                    <div name="textJustified" id="textJustified" className="card-panel teal lighten-2">{this.state.textJustified}</div>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit"
              name="action">Submit</button>
        </form>
        );
    }
}
 
export default LoginForm;