// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authorizationmiddleware');
const adminOnly = require('../middleware/adminmiddleware');

// POST /api/login
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username }).select("+password");
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     res.json({ message: "Login successful",username:user.username, userId: user._id,role:user.role });
// });

//Industry standard method  using JWT tokens:
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
);
    res.json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        }
    });
});
router.get('/admin-dashboard', auth, adminOnly, (req, res) => {
    res.json({ message: "Welcome Admin" });
});
module.exports = router;