const { hashPassword } = require('../helpers/auth');
const userModel=require('../models/userModel')


exports.registerController=async(req,res)=>{
   try {
      // 1. destructure name, email, password from req.body
      const{name,email,address,password,phone}=req.body;
      // 2. all fields require validation
      if(!name.trim()){
         return res.send({error:"name is required"})
      }
      if(!email){
         return res.send({error:"email is required"})
      }
      if(!password){
         return res.send({error:"password is required"})
      }
      if(!address.trim()){
         return res.send({error:"address is required"})
      }
      if(!phone){
         return res.send({error:"phone is required"})
      }
      // check user
      const existingUser=await userModel.findOne({email})
      // check existing user
      if(existingUser){
         return res.status(200).send({
            success:true,
            message:"Already exists please login",

         })
      }
      // hashed password
      const hashedPassword=await hashPassword(password)
      // save
      const user=await new userModel({
         name,email,address,phone,password:hashedPassword
      }).save();
      res.status(201).send({
         success:true,
         message:"register complete",
         user
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:"Error in registration",
         error
      })
   }
}

