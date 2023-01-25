import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Login(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  let checkUsername = (event) => {
    setUsername(event.target.value)
    checkInfo(event.target.value, password)
  }
  let checkPassword = (event) => {
    setPassword(event.target.value)
    checkInfo(username, event.target.value)
  }

  let checkInfo = (username1, password1) => {
    if (username1 && password1) {
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username1, password: password1 })
      })
        .then(response => { return response.json() })
        .then(res => {
          console.log(res);
          if (res.isLogin) {
            props.setUsername(username1)
            navigate('/homepage')
          }
        })
    }
  }

  return (
    <div>
      <h1>Welcome please Log-in</h1>
      <form >
        <input type="hidden" value="" />
        <input type="text" name="username" id="username" placeholder='Username' autoComplete='off' onChange={checkUsername} />
        <input type="password" name="password" id="password" placeholder='Password' autoComplete='off' onChange={checkPassword} />
      </form>

    </div>
  )
}
