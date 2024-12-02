import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const { login, currentUser } = useContext(AuthContext)

    const [err, setErr] = useState("")

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await login(data)

            navigate("/")
        } catch (err) {
            setErr(err.response.data)
        }
    }


    return (
        <div className='flex items-center justify-center flex-col h-screen bg-gradient-to-tr from-red-400 to-red-500'>
            <h1 className='text-3xl font-bold mb-3 text-slate-100'>Login</h1>
            <form className='flex flex-col items-center p-8 rounded bg-slate-100'>
                <div className='flex flex-col items-center gap-2 relative'>
                    <input className="w-72 px-3 py-2 rounded border-gray-300 border-[2px]" name='username' onChange={handleChange} type="text" placeholder='username' />
                    <input className="w-72 px-3 py-2 rounded border-gray-300 border-[2px]" name='password' onChange={handleChange} type="password" placeholder='password' />
                    {err && <p className='text-sm text-red-500 w-full absolute -bottom-7'>{err}</p>}
                </div>
                <button onClick={handleSubmit} className="w-full bg-red-800 rounded p-2 font-medium text-slate-200 mt-12" type="submit">Submit</button>
                <span className='mt-3 text-sm'>Don't have an account? <span className='underline text-red-600 hover:text-red-700'><Link to="/register">Register</Link></span></span>
            </form>
        </div>
    )
}

export default Login