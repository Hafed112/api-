const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")
const {
        createProduct,
        getAllProduct,
        getProduct,
    } 
    = require("../controllers/productController");

router.route('/').post(createProduct);
router.route('/').get(getAllProduct);
router.get('/:productId',productController.getProduct);
router.delete('/delete/:productId',productController.deleteProduct);







module.exports = router;