import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Grievance from './components/Grievance'
import Details from './components/Details'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route } from 'react-router'
import './App.css'

const App = () => {
  return(
    <>
    <Navbar/>
    <Route exact path = "/">
      <Home/>
    </Route>

    <Route path = "/details">
      <Details/>
    </Route>

    <Route path = "/grievance">
      <Grievance/>
    </Route>

    <Route path = "/login">
      <Login/>
    </Route>

    <Route path = "/signup">
      <Signup/>
    </Route>

    </>
  )
}

export default App;