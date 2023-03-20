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

exports.updateCategoryController=async(req,res)=>{
   try {
      const {name}=req.body;
      const {id}=req.params;
      const category=await categoryModel.findByIdAndUpdate(
         id,
         {name,slug:slugify(name)},{new:true}// here new is using for updating page

      );
      res.status(200).send({
         success:true,
         message:"category is update",
         category
      })

   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message: "Error while updating category",
      })
   }
}

// get all category

exports.getAllCategory=async(req,res)=>{
   try {
      const category=await categoryModel.find({});
      res.status(200).send({
         success:true,
         message:"All category list",
         category
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message: "Error while getting all categories",
      })
   }
}

// single category

exports.singleCategory=async(req,res)=>{
   try {
    const category=await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
      success:true,
      message:"single category",
      category
   })
   } catch (error) {
      res.status(500).send({
         success:false,
         error,
         message: "Error while getting single category",
      })
   }
}

// Delete category

exports.deleteCategory=async(req,res)=>{
   try {
      const {id}=req.params;
      await categoryModel.findByIdAndDelete(id)
      res.status(200).send({
         success:true,
         message:"category is deleted",
         
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message: "Error while getting single category",
      })
   }
}