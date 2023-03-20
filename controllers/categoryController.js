const categoryModel = require("../models/categoryModel");
const slugify = require('slugify')


exports.createCategoryController=async(req,res)=>{
   try {
      // 1. destructure name, from req.body
      const{name}=req.body;
      if(!name.trim()){
         return res.send({message:"name is required"})
      }
      const existingCategory = await categoryModel.findOne({name})
         if(existingCategory){
            return res.status(200).send({
               success:true,
               message:"category already exists"
            
      })
   }
   const category= await new categoryModel({
      name,
      slug: slugify(name),
   }).save();
   res.status(201).send({
      success:true,
      message:"new category created",
      category
   })
 } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error in Category"
      })
   }
}