import React from 'react'
import {Link} from 'react-router-dom';
import Home from './Home'


  DEFAULT_STATE = {
    username: "",
    password: "",
    errors: ''
  }

  state = this.DEFAULT_STATE

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const auth = { username, password };
    this.doFetch(auth)
  }

  doFetch(auth) {
    fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript"
      },
      method: "POST",
      body: JSON.stringify(auth)
    }).then(r => r.json()).then(json => {
        if (json.error) {
          this.setState({ errors: json.error })
        } else {
          this.setState({ ...this.DEFAULT_STATE })
          this.props.authSet(json)
          // this.props.history.push("/")
          // console.log(this.props.history.location.pathname);
        }
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



render(){
  // console.log(this.props.history.location.pathname);
  return(
      <div className="col-md-6 mb-4">
      { (this.state.errors) ? console.log(this.state.errors) : "" }
        <div className="card">
          <div className="card-body">
            <h3 className="text-center default-text py-3"><i className="fa fa-lock"></i> Login:</h3>
            <div className="md-form">
              <i className="fa fa-envelope prefix grey-text"></i>
              <input type="text" id="username" className="form-control" value={this.state.username} name="username" onChange={this.handleChange}/>
              <label htmlFor="defaultForm-email">Your Username</label>
            </div>
            <div className="md-form">
                <i className="fa fa-lock prefix grey-text"></i>
                <input type="password" id="password" className="form-control" value={this.state.password} name="password"onChange={this.handleChange}/>
                <label htmlFor="defaultForm-pass">Your password</label>
            </div>
            <div className="text-center">
              <button className="btn btn-default waves-effect waves-light" onClick={this.handleSubmit}>Submit</button>

            </div>
          </div>
        </div>
      </div>

  )
  }
}

export default Login;
