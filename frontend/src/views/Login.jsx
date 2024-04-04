import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api"; // Assuming you have defined the base URL in api/api.js

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function toRegister() {
    navigate("/Creation");
  }

  async function login() {
    try {
      const response = await fetch(`${api}/login`, { // Using dynamic URL
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userData = await response.json();
      localStorage.setItem("token", userData.token);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem("userId", userData.userId);
      
      // Redirect user to the appropriate page after successful login
      // For example, you can redirect them to the homepage
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (display error message, etc.)
    }
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