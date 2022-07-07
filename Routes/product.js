const Product = require("../Models/Product");
const router = require("express").Router();
const { verifyToken, authorisation, authorisationAndAdmin } = require("./verifyToken")

// Create
router.post("/", authorisationAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
        console.log(savedProduct)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// Update
router.put("/:id", authorisationAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })

        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete product
router.delete("/:id", authorisationAndAdmin, async (req, res) => {
    try {
        await Product.deleteOne({id: req.params.id})
        res.status(200).json("Product deleted successfuly")
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//Get
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GetAll
router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        if(qNew){
            products = await Product.find();
        } else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        } else {
            products = await Product.find();
        }

        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// //Get user stats
// router.get("/stats", authorisationAndAdmin, async (req, res) => {
//     try {
//         // Get the stats ...
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })


module.exports = router;
