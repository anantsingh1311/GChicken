const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//for password setup
const bcrypt = require("bcryptjs");

//Data base for user data:
const userSchema = new Schema({
    itemName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:3
    },
    description:{
         type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10
    },
    price:{
        type: Number,
        required: true,
        trim: true,
        minlength: 6,
        select: false
    }
}, {
    timestamps:true
});

const Items = mongoose.model('Items', userSchema);
module.exports = Items;