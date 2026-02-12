import React from "react";
import {useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';





const Login = () => {


  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
 const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/auth/login`,{email,password});

      if(response.data.success){
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("userName", response.data.user.name);
        toast.success("login Successfull")
        navigate("/")
      }
      
    } catch(error){
      console.log(error)
      toast.error("login failed")

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setEmail(e.target.value)}

            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setPassword(e.target.value)}

            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <p className="text-center text-gray-600 mt-4">
         Don't have Account ? <Link to="/register">Register</Link>
        </p>
        </form>

    
      </div>
    </div>
  );
};

export default Login;
