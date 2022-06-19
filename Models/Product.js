const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, requried: true, unique: true },
    desc: { type: String, requried: true },
    img: { type: String, requried: true },
    categories: { type: Array, requried: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, requried: true },
}, { timestamps: true })

module.export = mongoose.model("product", ProductSchema)