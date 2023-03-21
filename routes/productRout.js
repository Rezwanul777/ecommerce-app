const express=require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const Controller=require('../controllers/productController');
const router=express.Router();
const formidableMiddleware = require('express-formidable');

// router
// create product router

router.post('/create-product',requireSignIn,isAdmin,formidableMiddleware(),Controller.createProductController)

// get allproduct router

router.get('/get-product',Controller.getProductController)

// single product router

router.get('/single-product/:slug',Controller.getSingleProductController)

// get photo router

router.get('/product-photo/:productid',Controller.getPhotoController)

// delete product router
router.delete("/delete-product/:productid", requireSignIn, isAdmin,Controller.deleteProductController);

// update product router
router.put('/update-product/:productid',requireSignIn,isAdmin,formidableMiddleware(),Controller.updateProductController)





module.exports=router;