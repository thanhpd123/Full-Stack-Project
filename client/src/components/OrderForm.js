// src/components/OrderForm.js
import React, { useState } from 'react';
import { createOrder } from '../api/api';

const OrderForm = ({ pizzaId }) => {
    const [orderData, setOrderData] = useState({
        user: '',
        pizzas: [
            {
                pizza: pizzaId,
                quantity: 1,
                size: 'medium',
                toppings: [],
            },
        ],
        totalAmount: 0,
        status: 'Pending',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newOrder = await createOrder(orderData);
            console.log('Order created:', newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Order Pizza</h2>
            <input type="text" name="user" placeholder="User ID" onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
            <input type="text" name="size" placeholder="Size (small/medium/large)" onChange={handleChange} required />
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
