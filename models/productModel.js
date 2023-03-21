const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema=new Schema({
   name:{
      type:String,
      trim:true,
      required:true
   },
   slug:{
      type:String,
      required:true
   },
   description:{
      type:String,
      required:true
   },

   price:{
      type:Number,
      trim:true,
      required:true
   },
   category:{
      type:mongoose.ObjectId,
      ref:"category",
      required:true
   },
   quantity:{
      type:Number,
      required:true
   },
   photo:{
      data:Buffer,
      contentType:String
   },
   shipping:{
      type:Boolean
   }

},{timestamps:true,versionKey:false})

module.exports= mongoose.model('products',productSchema)