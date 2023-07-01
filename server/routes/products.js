const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();
require('../config/passport')
router.use(passport.initialize());

const ItemModel = require('../models/items');

router.get('/:id', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    await ItemModel.findById(req.params.id).then(item => {
        console.log(item);
        res.send(item);
    })
    console.log(req.params);
});

module.exports = router;