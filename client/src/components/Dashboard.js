import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PizzaList from './PizzaList';
import OrderForm from './OrderForm';

function Dashboard() {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Online Pizza Shop</h1>
            <PizzaList />
            <OrderForm />
        </div>
    );
}

export default Dashboard;
