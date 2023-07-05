const express = require('express');
const router = express.Router();

const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

require('dotenv').config();
require('../config/passport')
router.use(passport.initialize());

const UserModel = require('../models/user');

router.get('/', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    console.log(req.user);
    const data = {
        username: req.user.username,
        id: req.user._id,
        email: req.user.email
    }
    res.send(data);
});

module.exports = router;