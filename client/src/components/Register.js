// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../api/api';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await registerUser(userData);
            console.log('User registered:', newUser);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
