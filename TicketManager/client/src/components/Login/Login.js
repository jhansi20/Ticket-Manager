
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import "bootstrap/dist/js/bootstrap.min.js";
import './Login.css';
import { useNavigate,Link } from 'react-router-dom';
// class Login extends Component{

async function loginUser(credentials) {
  // const navigate = useNavigate();
  const res = await fetch('http://localhost:3003/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())

  if (res.statusCode==200) {
    sessionStorage.setItem('userid',credentials.userid);
    swal({
      title: "Login success",
      text: "success",
      icon: "success",
      button: "ok",
    });
  }
  else if (res.statusCode == 401) {
    swal({
      title: "Incorrect Password",
      text: "try again",
      icon: "error",
      button: "ok",
    });
  }
  else if(res.statusCode == 404){
    swal({
      title: "User doesn't exist",
      text: "try again",
      icon: "error",
      button: "ok",
    });

  }
  console.log(res)
  return res
}
export default function Login() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userid')
    if (userId)
        navigate('/dashboard')
  // const navigate = useNavigate();
  const [userid, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    await loginUser({
      userid,
      password
    },
    );
   navigate('/dashboard')
    // setToken(token);
  }
  
  return (
    <div className="login-wrapper">
      <h3>Log In</h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="userid">User id</label>
          <input type="text" class="form-control" id="userid" name="userid" required onChange={e => setUserName(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" required onChange={e => setPassword(e.target.value)} />
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register">Register here</Link>.
      </p>
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
// }
