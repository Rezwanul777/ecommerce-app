const express=require('express');
const Controller=require('../controllers/categoryController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

const router=express.Router();

//router
// CREATE CATEGORY

router.post('/create-category',requireSignIn,isAdmin,Controller.createCategoryController)

// category update

router.put('/update-category/:id',requireSignIn,isAdmin,Controller.updateCategoryController)

//category-all route

router.get('/get-category',Controller.getAllCategory)

// single category

router.get('/single-category/:slug',Controller.singleCategory)

// delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,Controller.deleteCategory)
module.exports = router;