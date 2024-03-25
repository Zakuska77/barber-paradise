import React, {useEffect} from 'react'
import Login from './login'

function App(){
  useEffect(()=> {
    fetch('http://localhost:3000/Clients')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  })
  return (
    <div>
      <Login />
    </div>
  )
}

export default App