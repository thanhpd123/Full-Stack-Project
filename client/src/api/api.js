// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Địa chỉ API

// Hàm lấy danh sách pizza
export const getPizzas = async () => {
    const response = await axios.get(`${API_URL}/pizzas`);
    return response.data;
};

// Hàm tạo đơn hàng
export const createOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
};

// Hàm đăng ký người dùng
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

// Hàm đăng nhập người dùng
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
};
