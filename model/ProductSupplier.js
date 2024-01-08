const mongoose = require("mongoose");

const productSupplierSchema = mongoose.Schema({
    product:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId, ref:'Product'
            },
        }
    ],
    supplier:[
        {
            supplierId:{
                type:mongoose.Schema.Types.ObjectId, ref:'SupplierInfo'
            },
        }
    ],
    LeadTime:{type:Number,require:true},
    Cost:{type:Number,require:true},
},{timestamps:true})

module.exports = mongoose.model('ProductSupplier',productSupplierSchema)