const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
        cart: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Users", userSchema);
