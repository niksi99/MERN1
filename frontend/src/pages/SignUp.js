import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import Header from '../component/Header'
import Footer from '../component/Footer'

const SignUp = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {name, email, password} = values;

    const handleChange = name => (event) => {
        //console.log(event.target.value)
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newUser = await axios.post('/api/signup', {
                name,
                email,
                password
            })

            console.log(newUser)

            if(newUser.data.success === true) {
                setValues({ name: '', email: '', password: ''});
                toast.success('Sign up successfully done, please log in!');
            }
        }
        catch(err) {
            console.log(err.response.data.error)
            toast.error(err.response.data.error);
        }

    }

  return (
    <div>
      <h1>Sign Up:</h1>
      <form>
        <div>
            <Header/>
            <label htmlFor="name">Name: </label>
            <input onChange={handleChange("name")} type="text" id="name" placeholder='name' value={name}/>
        </div>
        <div>
            <label htmlFor="email">Email: </label>
            <input onChange={handleChange("email")} type="text" id="email" placeholder='email' value={email}/>
        </div>
        <div>
            <label  htmlFor="password">Password: </label>
            <input onChange={handleChange("password")} type="password" id="password" placeholder='password' value={password}/>
        </div>
        <button onClick={handleSubmit} type="submit">Sign Up</button>
      </form>
      <Footer/>
    </div>
  )
}

export default SignUp
