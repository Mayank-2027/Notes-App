import { useState } from 'react'
import {BrowserRouter,Routes ,Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';

import './App.css'
import Signup from "./pages/signup.jsx"
import Home from "./pages/home"
import Login from "./pages/login"



function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Signup/>}></Route>
          <Route path="login" element={<Login/>}></Route>
      </Routes>
      <ToastContainer
  toastClassName="bg-white text-gray-800 rounded-lg shadow-md"
  bodyClassName="text-sm font-medium"
  progressClassName="bg-blue-600"
/>

    </BrowserRouter>
        )}
      

      export default App
