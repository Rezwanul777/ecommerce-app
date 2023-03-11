const  {readdirSync } = require("fs");
const path = require("path");
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

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
app.use(express.urlencoded({extended : true}));
app.use(cors())


//routes middlewares
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`))) 

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