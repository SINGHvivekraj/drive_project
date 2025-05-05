const express=require('express');
const router=express.Router();

router.get('/register',(req,res)=>res.render('register'));//register.ejs file render

router.post('/register',(req,res)=>{ //post method hit by form submit
    console.log(req.body);
    res.send('user registred');
});



module.exports=router;