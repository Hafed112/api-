const mongoose = require("mongoose");

warehouseSchema = mongoose.Schema({
    location:{type:String,require:true},
    capacity:{type:Number,require:true},
    product:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId, ref:'Product'
            },
        }
    ],

},{timestamps:true}) 

module.exports=mongoose.model("Warehouse",warehouseSchema);