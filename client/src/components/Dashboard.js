// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import PizzaList from './components/PizzaList';
// import OrderForm from './components/OrderForm';
// import Register from './components/Register';

// function Dashboard() {
//     const [data, setData] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>{data}</h1>
//             <h1>Online Pizza Shop</h1>
//             <Register />
//             <PizzaList />
//             <OrderForm pizzaId="6710c6e7cafc0b2aab322aa3" />
//         </div>
//     );
// }

// export default Dashboard;
