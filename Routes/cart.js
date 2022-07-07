const Cart = require("../Models/Cart");
const router = require("express").Router();
const { verifyToken, authorisation, authorisationAndAdmin } = require("./verifyToken")

// Create
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
        console.log(savedCart)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// Update
router.put("/:id", authorisation, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })

        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete product
router.delete("/:id", authorisation, async (req, res) => {
    try {
        await Cart.deleteOne({ id: req.params.id })
        res.status(200).json("Cart deleted successfuly")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//Get
router.get("/:userid", authorisation, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })

        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GetAll
router.get("/", authorisationAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()

        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
