import React from 'react'

class SignUp extends React.Component {

  DEFAULT_STATE = {
    name: '',
    username: "",
    password: "",
    errors: ''
  }

  state = this.DEFAULT_STATE

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, username, password } = this.state;
    const auth = { name, username, password };
    this.doFetch(auth)
  }

  doFetch(auth){
    console.log("HELLO!!!!")
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(auth)
    }).then(r => r.json()).then(json => {
      console.log(json);
        if (json.error) {
          this.setState({ errors: json.error })
        } else {
          this.setState({ ...this.DEFAULT_STATE })
          this.props.authSet(json)
        }
      })
    }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


render(){
  return(
    <div className="col-md-6  mb-4 col-centered mx-auto form-white">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center default-text py-3"><i className="fa fa-lock"></i> SignUp:</h3>
          <div className="md-form">
            <i className="fa  fa-user prefix grey-text"></i>
              <input type="text" id="name" className="form-control" value={this.state.name} name="name" onChange={this.handleChange} placeholder="Your Name"/>
          </div>
            <div className="md-form">
              <i className="fa  fa-user prefix grey-text"></i>
                <input type="text" id="username" className="form-control" value={this.state.username} name="username" onChange={this.handleChange} placeholder="Your Username"/>
            </div>
            <div className="md-form">
              <i className="fa fa-lock prefix grey-text"></i>
              <input type="password" id="password" className="form-control" value={this.state.password} name="password"onChange={this.handleChange}placeholder="Your Password"/>
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

export default SignUp;
