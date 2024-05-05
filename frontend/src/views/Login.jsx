import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api"; // Assuming you have defined the base URL in api/api.js

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function toRegisterClient() {
    navigate("/CreationCompteClient");
  }

  function toRegisterCoiffeur() {
    navigate("/CreationCompteCoiffeur");
  }
  console.log(email, password)
  async function login() {
    try {
      const response = await fetch(`${api}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      const userData = await response.json();
      if (!response.ok) {
        throw new Error(userData.message);
      }

      localStorage.setItem("token", userData.token);
      localStorage.setItem("userType", userData.userType);
      localStorage.setItem("userId", userData.userId);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
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
            <button onClick={toRegisterClient} className="button is-link is-inverted ml-2">Register as Client </button>
            <button onClick={toRegisterCoiffeur} className="button is-link is-inverted ml-2">Register as Coiffeur </button>
          </div>
        </div>
      </div >
    </>
  )
}

export default Login;
