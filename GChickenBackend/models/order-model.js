const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//Data base for items data:
const userSchema = new Schema({
   username:{
    type:String,
    required:true,
    trim:true

   },
   email:{
    type:String,
    required:true,
    trim:true

   },
   adress1:{
    type: String
    ,required:true
    ,trim: true
   },
   adress2:{
    type: String,
    trim: true
   },
   city:{
    Type: String,
    required: true,
    trim: true
   },
   postcode:{
    Type: String,
    required: true,
    trim: true
   },
   items:[String]

}, {
    timestamps:true
});

const Items = mongoose.model('Order', userSchema);
module.exports = Items;