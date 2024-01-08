const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title :{type:String,require:true,unique:true},
    description:{type:String,require:true},
    category :{type:Array},
    img :{type:Array},
    color:{type:Array},
    price :{type:Number},
    inStock:{type:Boolean , default:true},
    cartImg:{type:String},
    defaultColor:{type:String},

},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)