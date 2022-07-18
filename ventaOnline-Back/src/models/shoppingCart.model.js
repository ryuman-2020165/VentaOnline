'use strict'

const mongoose = require('mongoose');

const shoppingCartSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    products: [
        {
          product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
          quantity: Number,
          subTotal: Number //quantity * product.price
        }
    ],
    quantityProducts: Number, //length del arreglo
    total: Number //suma de subtotales de cada producto
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);