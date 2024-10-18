// src/components/PizzaList.js
import React, { useEffect, useState } from 'react';
import { getPizzas } from '../api/api';
import { Card, Row, Col } from 'react-bootstrap';

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
            <ul>
                {pizzas.map((pizza) => (
                    <li key={pizza._id}>
                        <h3>{pizza.name}</h3>
                        <p>{pizza.description}</p>
                        <p>Price: ${pizza.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PizzaList;
