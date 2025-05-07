const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')


router.get('/register',(req,res)=>res.render('register'));//register.ejs file render

router.post('/register',

    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5}),

    async (req,res)=>{ //post method hit by form submit
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
            message:'invalid data'
        })
    }
    
    const {email,username,password}=req.body;
    const hashpassword=await bcrypt.hash(password,10);

    const newuser=await userModel.create({
        email,username,password:hashpassword
    })

    res.json(newuser);
    }
);
 


module.exports=router;