const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


router.get('/register',(req,res)=>res.render('register'));//register.ejs file render

router.post('/register',

    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:5}),

    async (req,res)=>{ //post method hit by form submit of registration
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

//login
router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',
    body('username').trim().isLength({min:13}),//middlewares for express validator
    body('password').trim().isLength({min:5}),
    async(req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:"invalid data"
            })
        }

        const {username,password}=req.body;

        const user=await userModel.findOne({
            username:username
        })
        
        if(!user) return res.sendStatus(400).json({
            message:"username or password galat hai ji"
        })

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.sendStatus(400).json({
            message:"username or password galat hai ji"
        }) 

        //now generate a token using JWT

        const token=jwt.sign({
            userId:user._id,email:user.email,username:user.username
        },process.env.JWT_SECRET)

        //res.json({token});
        res.cookie("cookie_name",token);
        res.send('Logged In');

    }
)
 


module.exports=router;