const mongoose=require("mongoose");
function connecttoToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("connected to db")});//to us the secret values in .env file
}
module.exports=connecttoToDB;

//generally the connection is imported in app.js