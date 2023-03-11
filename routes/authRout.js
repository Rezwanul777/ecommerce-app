const express=require('express')
const Controller=require('../controllers/authController')

//router object

const router=express.Router();

//routing
// register router
router.post('/register',Controller.registerController)

// login router

router.post('/login',Controller.loginController)

module.exports=router;
