const mongoose = require("mongoose");

const ReviewCutomerSchema = mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    img:{type:String},
    rating:{type:Number,require:true},
})


module.exports = mongoose.model('ReviewCustomer',ReviewCutomerSchema);