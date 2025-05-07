const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[5,"provide atleast 5 chars"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,"provide atleast 13 chars"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,"provide atleast 5 chars"]
    }
})

const user=mongoose.model('userg',userSchema);
module.exports=user;