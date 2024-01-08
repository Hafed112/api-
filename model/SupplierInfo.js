const mongoose = require("mongoose");

const supplierInfoSchema = mongoose.Schema({
    name:{type:String,require:true},
})

module.exports = mongoose.model('SupplierInfo',supplierInfoSchema);
