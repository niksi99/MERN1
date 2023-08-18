import React, { useState } from 'react'
import Header from '../component/Header'
import { toast } from 'react-toastify'
import axios from 'axios'

const LogIn = ({history}) => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const { email, password } = values;

    const handleLoggingIn = logInVariable => (event) => {
        setValues({ ...values, [logInVariable]: event.target.value })
    }

    const submitHandle = async (event) => {
        event.preventDefault()
        try {
            const {data} = await axios.post('/api/login', {
                email,
                password
            });

            console.log(data)

            if(data.success === true) {
                setValues({ email: '', password: ''})
                toast.success('Log in successfully done')
                history.push('/user/profile');
                if(typeof window !== 'undefined') {
                    localStorage.setItem("token", JSON.stringify(data))
                }
            }
        }
        catch(err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        }
    }

  return (
    <div>
        <h1>Log In</h1>
        <Header/>
        <form>
        <div>
            <label htmlFor="email">Email: </label>
            <input onChange={handleLoggingIn("email")} type="text" id="email" placeholder='email' value={email}/>
        </div>
        <div>
            <label  htmlFor="password">Password: </label>
            <input onChange={handleLoggingIn("password")} type="password" id="password" placeholder='password' value={password}/>
        </div>
        <button onClick={submitHandle}type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default LogIn
