
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate,Link } from 'react-router-dom';

async function registerUser(credentials) {
  // const navigate = useNavigate();
  const res = await fetch('http://localhost:3003/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
  console.log(res)

  return res
}
export default function SignUp() {
  const [userid, setUserName] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
   await registerUser({
        name,
        email,
      userid,
      password
    },
    
    );
    navigate('/login')
    // history.push('/login');
    // setToken(token);
  }
  
  return (
    <div className="login-wrapper">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
      <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" name="name" required onChange={e => setName(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" name="email" required onChange={e => setEmail(e.target.value)} />
        </div>
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
            Sign Up
          </button>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login here</Link>.
      </p>
    </div>
  )
}