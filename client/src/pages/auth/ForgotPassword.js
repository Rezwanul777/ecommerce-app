import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate} from 'react-router-dom'
import axios from "axios";


const ForgotPassword = () => {
const [email, setEmail] = useState("");
const [newPassword, setNewPassword] = useState("");
const[answer,setAnswer]=useState("")


const navigate=useNavigate()



// form submit
const handleSubmit=async(e)=>{
    e.preventDefault()
   try {
    const res=await axios.post("/api/v1/forgot-password",{email,newPassword,answer})
    
    if(res && res.data.success){
       toast.success(res.data.message)
   
       localStorage.setItem('auth',JSON.stringify(res.data))
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
         <h1>Forgot Password</h1>
         <div className="register">
         
          <form onSubmit={handleSubmit}>
         
             <div class="mb-3">
              
                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'required/>
                  
             </div>
             <div class="mb-3">
              
                <input type="text" className="form-control" id="exampleInputEmail1" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder='What is your pet name'required/>
                  
             </div>
             <div className="mb-3">
               
                <input type="password" className="form-control" id="exampleInputPassword1" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter your Password'required/>
             </div>
             
            
             <button type="submit" className="btn btn-primary px-5">Reset Password</button>
            
          </form>
       </div>
      </Layout>
   );
};

export default ForgotPassword;