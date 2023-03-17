const express=require('express')
const Controller=require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

// middleware import


//router object

const router=express.Router();

//routing
// register router
router.post('/register',Controller.registerController)

// login router

router.post('/login',Controller.loginController)

// forgot password

router.post('/forgot-password',Controller.forgotPasswordController)

// test router
router.get('/test',requireSignIn,isAdmin,Controller.testController)

// protected route

router.get('/user-auth',requireSignIn,(req,res)=>{
   res.status(200).send({ok:true})
})

module.exports=router;
