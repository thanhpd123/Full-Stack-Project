const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        error.status(500).json({ message: error.message });
    }
});

module.exports = router;