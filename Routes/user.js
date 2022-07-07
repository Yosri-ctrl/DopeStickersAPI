const User = require("../Models/User");
const router = require("express").Router();
const { verifyToken, authorisation, authorisationAndAdmin } = require("./verifyToken")

// Update
router.put("/:id", authorisation, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })

        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete User
router.delete("/:id", authorisation, async (req, res) => {
    try {
        await User.deleteOne(req.params.id)
        res.status(200).json("User deleted successfuly")
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get
router.get("/:id", authorisationAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GetAll
router.get("/", authorisationAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().where(isAdmin = false).sort({ _id: -1 }).limit(5)
            : await User.find()

        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//Get user stats
router.get("/stats", authorisationAndAdmin, async (req, res) => {
    try {
        // Get the stats ...
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
