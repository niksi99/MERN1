import React from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserDashboard from './pages/user/UserDashboard'
import PrivateRoute from './component/PrivateRoute'

import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer/>
        <BrowserRouter>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/login" component={LogIn}></Route>
          <PrivateRoute exact path="/user/profile" component={UserDashboard}></PrivateRoute>
        </BrowserRouter>
    </>
  )
}

export default App
