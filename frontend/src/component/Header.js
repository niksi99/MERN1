import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const Header = () => {

  const logOut = ({history}) => {
    axios.get('/api/logout')
    .then(result => {
      toast.success('Log out succesfuly');
      localStorage.removeItem('token');
      history.push('/');
    })
    .catch(error => {
      console.log(error)
    });
  }

  return (
    <div>
      <nav>
        <button>Menu</button>
        <div>
            <NavLink to="#">MERN APP - 1</NavLink>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink to="" onClick={logOut}>Log out</NavLink>
                </li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
