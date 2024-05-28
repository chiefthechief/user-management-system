const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "username is required for account creation"]
    },
    userEmail: {
        type: String,
        required: [true, "the email of the user is required for account creation"]
    },
    userAge: {
        type: Number,
        required: [true, "the age of the user is required for account creation"]
    }
})

module.exports = mongoose.model("User", userSchema)