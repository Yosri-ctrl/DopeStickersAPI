const Order = require("../Models/Order");
const router = require("express").Router();
const { verifyToken, authorisation, authorisationAndAdmin } = require("./verifyToken")

// Create
router.post("/", authorisationAndAdmin, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
        console.log(savedOrder)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// Update
router.put("/:id", authorisationAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })

        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete order
router.delete("/:id", authorisationAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted successfuly")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//Get
router.get("/:userid", authorisationAndAdmin, async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.userId })

        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GetAll
router.get("/", authorisationAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()

        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
