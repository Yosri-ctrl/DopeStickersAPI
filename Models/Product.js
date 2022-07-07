const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: { type: String, requried: true, unique: true },
    desc: { type: String, requried: true },
    img: { type: String, requried: true },
    categories: { type: Array, requried: true },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, requried: true },
    inStock: {type: Boolean, default: true}
}, { timestamps: true })

module.exports = mongoose.model("product", ProductSchema)