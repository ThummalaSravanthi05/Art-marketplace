const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hash });
    await user.save();

    res.json({ message: "Account created successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: "Account not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.json({ message: "Wrong password" });
    }

    res.json({ message: "Login success", user });
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.json({ message: "Account already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        await newUser.save();

        res.json({ message: "Account created successfully" });

    } catch (err) {
        res.json({ message: "Error creating account" });
    }
});

module.exports = router;