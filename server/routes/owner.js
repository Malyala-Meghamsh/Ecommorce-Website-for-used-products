const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();
require('../config/passport')
router.use(passport.initialize());

const UserModel = require('../models/user');

router.get('/:id', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    await UserModel.findById(req.params.id).then(owner => {
        console.log(89, owner);
        const data = {
            ownerName : owner.name,
            ownerEmail: owner.email
        }
        res.send(data);
    })
});

module.exports = router;