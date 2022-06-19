const router = require("express").Router();

router.get("/usertest", (req, res) => {
    console.log("usertest connected");
    res.send("usertest connected");
})

router.post("/userpost", (req, res) => {
    const username = req.body.username;

    console.log(username)
    res.send("user name: " + username)
})

module.exports = router