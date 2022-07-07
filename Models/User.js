const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: { type: String, requried: true, unique: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    isAdmin: { type: Boolean, requried: true, default: false },
}, { timestamps: true })

module.exports = mongoose.model("user", UserSchema)