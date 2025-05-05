const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userrouter=require('./routes/user.routes');
app.use('/user',userrouter);

app.set('view engine','ejs');







app.listen(3000);

