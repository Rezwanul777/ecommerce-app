const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
// app create
const app = express()

//configuration
require('dotenv').config()

// database connection
connectDB()

// middleware
app.use(express.json())
app.use(morgan('dev'))

//api create

app.get('/',(req,res)=>{
   res.send(`<h1>This is useful Ecommerce Project</h1>`)
})

// port

const PORT=process.env.PORT ||8000

app.listen(PORT,()=>{
   console.log(`server is running on port ${PORT}`);
})


//prince@123456