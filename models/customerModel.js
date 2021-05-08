const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name:{
        type:String,
        required:[true , 'name is required!']
    },
    email:{
        type:String,
        required:[true, 'email is required!']
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Customer', customerSchema);