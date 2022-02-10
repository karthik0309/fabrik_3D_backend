const mongoose=require('mongoose')

const UploadSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    imageURL:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        required:true,
        type:Number
    }
},
{timestamps:true})

module.exports = mongoose.model("Upload",UploadSchema)