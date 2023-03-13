import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const Register = () => {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // form submit
  const handleSubmit=(e)=>{
      e.preventDefault()
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