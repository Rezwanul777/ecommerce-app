const mongoose = require('mongoose');

const connectDB=async()=>{
   try {
      const dbconnection=await mongoose.connect(process.env.MONGO_URL);
       console.log(`Connected to mongodb database ${dbconnection.connection.host}`);
   } catch (error) {
      console.log(`mongodb connection in ${error}`);
   }
}

module.exports=connectDB;