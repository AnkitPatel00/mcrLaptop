const mongoose = require('mongoose')

const laptopSchema = new mongoose.Schema({
brand:{type:String,required:true},
model: { type: String, required: true },
imgUrl:{ type: String, default:"https://placehold.co/600x400?text=Laptop+image"},
price:{type:String,required:true},
processor: { type: String},
ramSizeGB:{type:Number},
storageSizeGB:{type:Number},
screenSizeInches:{type:Number},
isTouchscreen:{type:Boolean,default:false},
hasSSD:{type:Boolean,default:false},
isSaleActive:{type:Boolean,default:false},
}, { timestamps: true })

const LaptopModel = mongoose.model('mcrlaptops', laptopSchema)

module.exports = LaptopModel