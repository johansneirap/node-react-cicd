import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  const login = async () => {
    const data = { username, password };
    const res = await axios.post('http://localhost:3001/auth/login', data);
    if (res.data.error) alert(res.data.error);
    else {
      sessionStorage.setItem('accessToken', res.data);
      history.push('/');
    }
  };
  return (
    <div className="loginContainer">
      <input type="text" onChange={(evt) => setUsername(evt.target.value)} />
      <input
        type="password"
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
