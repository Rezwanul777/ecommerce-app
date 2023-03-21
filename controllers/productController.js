const fs =require("fs");
const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");

exports.createProductController=async(req,res)=>{
   try {
      const{name,slug,description,price,category,quantity,shipping}= req.fields;
      const { photo } = req.files;
      // console.log(req.fields);
      // console.log(req.files);

      // validation
      switch (true) {
         
         case !name?.trim():
          return res.status(500).send({error:"Name is required"}) 

         case !description?.trim():
          return res.status(500).send({error:"Description is required"})  

         case !price?.trim():
          return res.status(500).send({error:"Price is required"})  

         case !category?.trim():
          return res.status(500).send({error:"Category is required"})  

         case !quantity?.trim():
          return res.status(500).send({error:"Quantity is required"})

          case photo && photo.size > 1000000:
          return res.json({ error: "Image should be less than 1mb in size" }); 
            
      }
      const products=new productModel({...req.fields,slug:slugify(name)})
      if(photo){
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
      }
      await products.save()
      res.status(201).send({
         success: true,
         message: "Product Created Successfully",
         products,
       });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error in create product"
      })
   }
}

// get all product

exports.getProductController=async(req,res)=>{
   try {
      const products=await productModel.find({}).populate('category').select('-photo').limit(10).sort({createdAt:-1})
      res.status(200).send({
         success:true,
         total:products.length,
         message:"all products in list",
         products
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
      message:"error in lists products",
      error:error.message
      })
   }
}

// get single product

exports.getSingleProductController=async(req,res)=>{
   try {
      const product=await productModel.findOne({slug:req.params.slug}).select('-photo').populate('category')
      res.status(200).send({
         success: true,
         message: "Single Product Fetched",
         product,
       });
   } catch (error) {
      console.log(error);
       res.status(500).send({
         message:"error in get single product",
         error:error.message
         })
   }
}

// photo controller

exports.getPhotoController=async(req,res)=>{
   try {
      const product=await productModel.findById(req.params.productid).select("photo")
     if(product.photo.data){
      res.set('Content-type',product.photo.contentType)
      return res.status(200).send(product.photo.data);
     }
   } catch (error) {
      console.log(error);
      res.status(500).send({
         message:"error in get single product",
         error:error.message
         })
   }
}