const express=require('express');
const app=express();


//congiguring .env file
const dotenv=require('dotenv');
dotenv.config();

//making the db connection
const connecttoToDB=require('./config/db');
connecttoToDB();

const cookieParser=require('cookie-parser')

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userrouter=require('./routes/user.routes');
app.use('/user',userrouter);

app.set('view engine','ejs');







app.listen(3000);

