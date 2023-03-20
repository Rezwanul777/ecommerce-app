const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema=new Schema({
   name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    }
} ,{timestamps:true,versionKey:false})

module.exports= mongoose.model('category',categorySchema)