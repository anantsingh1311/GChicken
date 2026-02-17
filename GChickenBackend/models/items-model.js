const mongoose = require("mongoose");

const Schema = mongoose.Schema;



//Data base for items data:
const userSchema = new Schema({
    //  username:{
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     minlength:5
    // },
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