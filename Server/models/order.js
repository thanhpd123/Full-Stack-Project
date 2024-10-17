const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pizzas: [{
        pizza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        toppings: [{ type: String }]
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);