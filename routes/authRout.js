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

// test route
router.get('/test',requireSignIn,isAdmin,Controller.testController)

module.exports=router;
