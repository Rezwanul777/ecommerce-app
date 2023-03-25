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

// dlete product controller
exports.deleteProductController=async(req,res)=>{
   try {
     const product=await productModel.findByIdAndDelete(req.params.productid).select("-photo")
     res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
      product
    }); 
   } catch (error) {
      console.log(error);
       res.status(500).send({
         message:"error in get single product",
         error:error.message
         })
   }
}

// update product controller
exports.updateProductController=async(req,res)=>{

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
      const products=await productModel.findByIdAndUpdate(req.params.productid,{...req.fields,slug:slugify(name)},{new:true})
      if(photo){
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
      }
      await products.save()
      res.status(201).send({
         success: true,
         message: "Product updated Successfully",
         products,
       });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         error,
         message:"Error in update product"
      })
   }
}

// product filter controller
exports.productFiltersController=async(req,res)=>{
   try {
      const {checked,radio}=req.body
      let args={}
      if(checked.length>0)args.category=checked;
      if(radio.length>0) args.price={ $gte: radio[0], $lte: radio[1] };
      console.log("args => ", args);
      const products=await productModel.find(args)
      res.status(200).send({
         success: true,
         products,
       });
   } catch (error) {
      console.log(error);
      res.status(400).send({
         success: false,
         message: "Error WHile Filtering Products",
         error,
       });
   }
}

// product per count controoler

exports.productCountController=async(req,res)=>{
   try {
      const total=await productModel.find({}).estimatedDocumentCount()
      res.status(200).send({
         success:true,
         total
      })
   } catch (error) {
      console.log(error)
      res.status(400).send({
         success: false,
         message: "Error WHile count Products",
         error,
       });
   }
}

// product per page controller

exports.productPageController=async(req,res)=>{
   try {
      const perPage=4;
      const page = req.params.page ? req.params.page : 1;
      const products=await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
      res.status(200).send({
         success:true,
         products
      })
   } catch (error) {
      console.log(error);
      res.status(400).send({
         success: false,
         message: "Error WHile loading Products",
         error,
       });
   }
}

//productSearchController

exports.productSearchController=async(req,res)=>{
   try {
      const {keyword}=req.params;
      const result=await productModel.find({
         $or:[
            {name:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}},
         ]
      }).select("-photo");
      res.json(result)
   } catch (error) {
      console.log(error);
      res.status(400).send({
         success: false,
         message: "Error WHile Search Products",
         error,
       });
   }
}