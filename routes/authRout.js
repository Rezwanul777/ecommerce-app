const express=require('express')
const Controller=require('../controllers/authController')

//router object

const router=express.Router();

//routing
// register router

router.post('/register',Controller.registerController)

module.exports=router;
