const mongoose = require('mongoose');
require('../config/dbConfig');

const itemsSchema = new mongoose.Schema({
    name : String,
    category: String,
    cost: Number,
    ownerID: String,
    bids: [{
        bidCost: Number,
        message: String,
        buyerID: String
    }],
    age: String,
    imageURL: String,
    description: String
});

const ItemModel = mongoose.model('Item', itemsSchema);

module.exports = ItemModel;