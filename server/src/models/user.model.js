const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    photo:{
        type: String,
        default: "https://sirinc2.org/branch129/wp-content/uploads/2019/04/no-photo-icon-22.png"
    },
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    
}, {timestamps: true})


// mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('user', userSchema)