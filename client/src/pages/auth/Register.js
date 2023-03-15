import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import axios from "axios";


  const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate=useNavigate()
  
  // form submit
  const handleSubmit=async(e)=>{
      e.preventDefault()
     try {
      const res=await axios.post("/api/v1/register",{name,email,password,phone,address})
      
      if(res && res.data.success){
         toast.success(res.data.message)
         navigate("/login")
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
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                
                <input type="text" className="form-control " id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your Name 'required/>
                 
             </div>
               <div class="mb-3">
                
                  <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'required/>
                    
               </div>
               <div className="mb-3">
                 
                  <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'required/>
               </div>
               <div className="mb-3">
                  
                 
                   <input type="text" className="form-control" id="exampleInputEmail1" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your Phone'/>
              
             </div>
            
                   <div className="mb-3">
                   <input type="text" className="form-control" id="exampleInputEmail1" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your Address'/>
                  </div>
              
               <button type="submit" className="btn btn-primary">Register</button>
            </form>
         </div>

      </Layout>

   );
};

export default Register;