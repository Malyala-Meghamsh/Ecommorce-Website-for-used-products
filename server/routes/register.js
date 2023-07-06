const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
    
router.post('/', async (req,res)=>{
    // console.log("Register function");
    await UserModel.findOne({username: req.body.username}).then(async (user)=>{
        if(user){
            return res.status(200).json(
            {
                success: false,
                message: "User Already exists" 
            })
        }
        const newUser = new UserModel({
            username : req.body.username,
            name: req.body.name,
            password : await bcrypt.hash(req.body.password, 10)
        })
        newUser.save().then(user => {
            return res.status(200).json({
                success: true,
                message : "User created successfully" ,
            })
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message : "Something Error Occured! User Not registered" ,
            })
        })
    })
});

module.exports = router;