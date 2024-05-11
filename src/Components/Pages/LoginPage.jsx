import axios from "axios";
import { useContext, useDebugValue, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";


export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  
  // This function handles the submission of login credentials.
  async function handleLoginSubmit(e) {
    e.preventDefault();

      // Check if email and password are not empty
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

    try {
      const {data} = await axios.post('/login', {email,password});
      setUser(data);
      alert('Login Successfully!');
      setRedirect(true);
    } catch (e) {
      alert('Login Failed!');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
        <input type="email" 
               placeholder="your@email.com" 
               value={email} 
               onChange={e => setEmail(e.target.value)}/>
        <input type="password" 
               placeholder="password" 
               value={password} 
               onChange={e => setPassword(e.target.value)}/>
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
      </form>
      </div>
    </div>
  )
}
