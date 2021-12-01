import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/login',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    console.log(data);
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"/>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;