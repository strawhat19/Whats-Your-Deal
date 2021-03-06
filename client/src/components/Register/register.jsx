import { useState } from 'react'

function Register(props) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(``);
  const [password, setPassword] = useState('');
  const [userStocks, setUserStocks] = useState(props.state.stocks);
  const [userHistories, setUserHistories] = useState(props.state.histories);
  
  async function registerUser(event){
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/register',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userStocks,
        userHistories
      }),
    })
    const data = await response.json();
    let user = {
      name,
      email,
      password,
      userStocks,
      userHistories
    }
    setProfile(user);
    console.log(profile);
    window.location.href = `/Login`;
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Name" />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"/>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => {
            setPassword(e.target.value)
            setUserStocks(props.state.stocks)
            setUserHistories(props.state.histories)
          }}
          placeholder="Password" />
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}

export default Register;
