import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import {useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
import { useAuth } from '../../context/auth';

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [auth,setAuth]=useAuth()

const navigate=useNavigate()
const location=useLocation()


// form submit
const handleSubmit=async(e)=>{
    e.preventDefault()
   try {
    const res=await axios.post("/api/v1/login",{email,password})
    
    if(res && res.data.success){
       toast.success(res.data.message)
       setAuth({
         ...auth,
         user:res.data.user,
         token:res.data.token
       })
       localStorage.setItem('auth',JSON.stringify(res.data))
       navigate(location.state||"/")
    }else{
       toast.error(res.data.message)
    }
   } catch (error) {
    console.log(error);
    toast.error("oops this is not correct")
   }
   //console.log(process.env.REACT_APP_API);
}
 return (
    <Layout>
       <div className="register">
          <h1>Login Now</h1>
          <form onSubmit={handleSubmit}>
         
             <div class="mb-3">
              
                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'required/>
                  
             </div>
             <div className="mb-3">
               
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'required/>
             </div>
             <div className="mb-3">
             <button type="button" className="btn btn-danger" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
             </div>
            
             <button type="submit" className="btn btn-primary px-5">login</button>
            
          </form>
       </div>

    </Layout>

 );
};


export default Login;
