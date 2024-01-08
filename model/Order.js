const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
     products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId, ref:'Product'
            },
            quantity:{
                type:Number,
                default:1,
            },
            color:{
                type:String,require:true
            }
        },
    ],
    totalAmount:{type:Number},
    phone:{type:Number,require:true},
    email:{type:String,require:true},
    address:{type:String,require:true},
    orderState:{
        type:String,
        enum:{
            values:['processing','shipped','delivered'],
            message:'{VALUE} is not supported',
        },
        default:'processing',
    },

})

module.exports = mongoose.model('Order',orderSchema);
