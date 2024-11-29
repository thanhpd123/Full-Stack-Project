// src/components/PizzaList.js
import React, { useEffect, useState } from 'react';
import { getPizzas } from '../api/api';

const PizzaList = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        const fetchPizzas = async () => {
            const pizzaData = await getPizzas();
            setPizzas(pizzaData);
        };
        fetchPizzas();
    }, []);

    return (
        <div>
            <h2>Pizza Menu</h2>
            <ul className="pizza-list">
                {pizzas.map((pizza) => (
                    <li key={pizza._id}>
                        <h3>{pizza.name}</h3>
                        <img src={pizza.image} alt={pizza.name} style={{ width: '200px', height: 'auto' }} />
                        <p>{pizza.description}</p>
                        <p>Price: ${pizza.price}</p>
                        <p>Toppings: {pizza.toppings}</p>
                        <p>Size: {pizza.sizes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PizzaList;
