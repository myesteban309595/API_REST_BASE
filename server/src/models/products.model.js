const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const productsSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    qualification: {
        type: Number,
        default: 0
    },
    postedBy: {
        type: ObjectId,
        ref: "user"    
    },
});

module.exports = mongoose.model("productos",productsSchema)
