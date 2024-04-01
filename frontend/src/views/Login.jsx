import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  function toRegister() {
    navigate("/Creation");
  }
  function login(){
    console.log(email, password);
  }
  return (
    <>
      <div className="m-6 p-4">
        <div className="box mt-4 mb-4 has-background-grey-lighter">
          <h1 className="title mt-2 mb-4">Login</h1>
          <div className="field">
            <label className="label"> Email</label>
            <div className="control">
              <input
                className="input has-background-white-ter"
                type="email"
                placeholder="e.g. alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input has-background-white-ter"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="mt-5">
            <button className="button is-info" onClick={login}>Sign in</button>
            <button onClick={toRegister} className="button is-link is-inverted ml-2">New User </button>
          </div>
        </div >
      </div >
    </>
  )
}
export default Login;