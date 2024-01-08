const express = require("express");
const router = express.Router();

const {
    createReview,getAllReview
} = require("../controllers/reviewController")



router.route('/create').post(createReview);
router.route('/').get(getAllReview);

module.exports=router