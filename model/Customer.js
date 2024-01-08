const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    first_name:{type:String,require:true},
    last_name:{type:String,require:true},
})

module.exports = mongoose.model("Customer",customerSchema);

