import React, {useState} from 'react';

// Pass down currentUser into this component
function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
  
   return (
      <form>
         <h1>LOGIN</h1>
         <p>Please enter your username and password.</p>

         <input 
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="off"
         />

         <input
            type="password"
            name=""
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="off"
         />

         <button type="submit">ENTER</button>
      </form>
   );
}

export default Login;