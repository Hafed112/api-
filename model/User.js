const mongoose = require("mongoose");

const useSchema = mongoose.Schema({
    first_name:{type:String,default:null},
    last_name:{type:String,default:null},
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,

    },
    password:{type:String},
    isAdmin:{type:Boolean,default:false},
    token:{type:String},
},{timestamps:true});

module.exports=mongoose.model("User",useSchema);

