
import {useNavigate} from "react-router-dom";

function Login() {
    
    const navigate = useNavigate();
    
    function handleClick() {
        navigate("/Creation");
    }
    return (  
    
    <>
        <form className="box mt-4 mb-4 ">
            <h1 className="title mt-2 mb-2"> Page de Login</h1>
      <div class="field">
        <label class="label">Email</label>
        <div className="control">
          <input className="input" type="email" placeholder="e.g. alex@example.com" />
        </div>
      </div>
    
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="********" />
        </div>
      </div>
    
      <button className="button is-info">Sign in</button>
      <button onClick={handleClick} className="button is-link is-inverted ml-2">New User </button>
    </form>
        
        </>

    )
  
   }
   export default Login;