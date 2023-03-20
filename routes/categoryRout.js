const express=require('express');
const Controller=require('../controllers/categoryController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const router=express.Router();

//router
// CREATE CATEGORY

router.post('/create-category',requireSignIn,isAdmin,Controller.createCategoryController)


module.exports = router;