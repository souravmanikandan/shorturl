import axios from "axios";
import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        try {
            const response = await axios.post('http://localhost:3333/api/auth/login', {email, password}, {withCredentials: true})
            console.log(response)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input 
            type="text" 
            className="grow" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input 
            type="password" 
            className="grow" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-active btn-primary">
        {loading ? 'Loading...' : "Login"}
      </button>
    </form>
    <p className="text-center">Already have an Account? <a href="/signup" className="underline text-primary">Signup</a> here</p>
    {error && (
        <p className="text-center text-red-500">{error}</p>
    )}
    </div>
  );
};

export default Login;
