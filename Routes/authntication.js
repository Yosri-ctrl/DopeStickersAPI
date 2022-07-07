const router = require("express").Router();
const User = require('../Models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register
router.post("/register", async (req, res) => {
    //Check method
    //Check if req is empty
    //Check if req has correct format

    const password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS).toString()
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: password,
    });
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
        console.log(savedUser)
    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//Login
router.post("/login", async (req, res) => {
    //Check method
    //Check if req is empty
    //Check if req has correct format

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Error finding the user!");

        const pass = CryptoJS.AES.decrypt(user.password, process.env.PASS).toString(CryptoJS.enc.Utf8);
        pass !== req.body.password && res.status(301).json("Error pass dosen't match!");

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT,
            {expiresIn: "3d"}
        )

        const { password, ...others } = user._doc;
        res.status(200).json({...others, token});
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
