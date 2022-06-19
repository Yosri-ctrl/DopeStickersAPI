const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: { type: String, requried: true },
    product: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },
        }
    ],
    amount: { type: Number, requried: true },
    address: { type: Object, requried: true },
    status: { type: String, requried: true, default: "pending" },
}, { timestamps: true })

module.export = mongoose.model("order", OrderSchema)