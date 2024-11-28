const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().lean();
        const safeUsers = users.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            address: user.address,
            phone: user.phone,
            role: user.role
        }));
        res.status(200).json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    console.log('Received registration data:', req.body);
    try {
        const { username, email, password, address, phone, role } = req.body;
        const user = new User({ username, email, password, address, phone, role: role || 'user' });
        const newUser = await user.save();
        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Email or username already exists' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || password !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;