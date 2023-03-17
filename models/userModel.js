const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema=new Schema({
   name:{
      type:String,
      required:true,
      trim:true,
   },
   email:{
      type:String,
      trim: true, 
      required:true,
      unique:true
   },
   password:{
      type:String,
      required:true,
   },
   phone: {
      type: String,
      required: true,
   },

   address: {
      type: String,
      trim: true, 
      required: true,
    },
    answer:{
      type: String,
      required:true,
    },

    role:{
      type:Number,
      default:0
    }

},{timestamps:true,versionKey:false})

module.exports= mongoose.model('users',userSchema)