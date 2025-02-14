import React, { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.MODE === "development" ? "http:localhost:5000" : "/"

const Form = () => {
  const [origUrl, setOrigUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!origUrl.trim()) {
      setError('Please enter a valid url')
      return;
    }
    setLoading(true);
    setError('')
    setShortUrl('')
    try {
      const response = await axios.post(`${API_URL}/api/short`, {origUrl})
      setShortUrl(response.data.shortUrl)
    } catch (error) {
      setError('Failed to shorten the URL. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/api/auth/logout')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='text-center'>
        <form onSubmit={handleSubmit} className='flex gap-1 justify-center'>
          <input 
            type="text" 
            placeholder="Type here" 
            className="input w-full max-w-xs" 
            value={origUrl}
            onChange={(e) => setOrigUrl(e.target.value)}
          />
          <button type='submit' className="btn btn-active btn-primary">
            {loading ? 'Loading...' : 'Shorten URL'}
          </button>
        </form>
        {error && (
          <p className='text-red-500 mt-2'>{error}</p>
        )}
        {shortUrl && (
          <p className='mt-2 text-green-500'>
            Shortend URL: <a target='_blank' href={shortUrl} className="text-blue-600 underline">{shortUrl}</a>
          </p>
        )}
        <p><a onClick={handleLogout} href={shortUrl} className="text-blue-600 underline">Logout</a></p>
    </div>
  )
}

export default Form