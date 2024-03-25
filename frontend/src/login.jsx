import React, {useState} from 'react'
import axios from 'axios'

function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:3000/login', {email, password})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' onChange={e => setEmail(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input type="Password" placeholder='Enter Password' onChange={e => setPassword(e.target.value)}></input>
          </div>
          <button>Login</button>
        </form>
      </div>

    </div>
  )
}

export default Login