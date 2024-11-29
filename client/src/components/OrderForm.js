// src/components/OrderForm.js
import React, { useState, useEffect } from 'react';
import { createOrder, getPizzas } from '../api/api';

const OrderForm = () => {
    const [orderData, setOrderData] = useState({
        user: '',
        pizzas: [{ pizza: '', quantity: 1, size: 'medium', toppings: [] }],
        totalAmount: 0,
        status: 'Pending'
    });
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        const fetchPizzas = async () => {
            const pizzaData = await getPizzas();
            setPizzas(pizzaData);
        };
        fetchPizzas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePizzaChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPizzas = [...orderData.pizzas];
        updatedPizzas[index] = {
            ...updatedPizzas[index],
            [name]: value,
        };
        setOrderData((prev) => ({
            ...prev,
            pizzas: updatedPizzas,
        }));
    };

    const handleToppingChange = (index, e) => {
        const { value } = e.target;
        const updatedPizzas = [...orderData.pizzas];
        updatedPizzas[index].toppings = Array.from(e.target.selectedOptions, option => option.value);
        setOrderData((prev) => ({
            ...prev,
            pizzas: updatedPizzas,
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
            <input type="text" name="user" placeholder="User Name" onChange={handleChange} required />
            {orderData.pizzas.map((pizzaOrder, index) => (
                <div key={index}>
                    <select name="pizza" onChange={(e) => handlePizzaChange(index, e)} required>
                        <option value="">Select Pizza</option>
                        {pizzas.map((pizza) => (
                            <option key={pizza._id} value={pizza._id}>
                                {pizza.name}
                            </option>
                        ))}
                    </select>
                    <input type="number" name="quantity" placeholder="Quantity" onChange={(e) => handlePizzaChange(index, e)} required />
                    <select name="size" onChange={(e) => handlePizzaChange(index, e)} required>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <select name="toppings" onChange={(e) => handleToppingChange(index, e)}>
                        <option value="Cheese">Cheese</option>
                        <option value="Tomato Sauce">Tomato Sauce</option>
                        <option value="Alfredo Sauce">Alfredo Sauce</option>
                    </select>
                </div>
            ))}
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;