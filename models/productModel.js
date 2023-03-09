const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Object,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    sold: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model("Products", productSchema);