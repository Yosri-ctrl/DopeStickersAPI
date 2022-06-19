const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userId: { type: String, requried: true },
    product: [
        {
            productId: { type: String},
            quantity: { type: Number, default: 1},
        }
    ],
}, { timestamps: true })

module.export = mongoose.model("cart", CartSchema)