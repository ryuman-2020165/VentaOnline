'use strict'

const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
   date: Date,
   serialNumber: String,
   user: {type: mongoose.Schema.ObjectId, ref: 'User'} ,
   nit: String,
   products: [
       {
           product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
           quantity: Number,
           subTotal: Number
       }
   ],
   quantityProducts: Number,
   total: Number
});

module.exports = mongoose.model('Invoice', invoiceSchema);