const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    rollno:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    messages:[
        {
            name:{
                type:String,
                required:true,
            },
            rollno:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
            },
            message:{
                type:String,
                required:true,
            },
            
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
});



//here is the code to hash the password
userSchema.pre('save', async function(next){
    console.log("Hi from inside");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});


//to generate a token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

//store the messages
userSchema.methods.addMessage = async function (name, rollno, email, message) {
    try{
        this.messages = this.messages.concat({name, rollno, email, message});
        await this.save();
        return this.messages;
    }catch(error){
        console.log(error);
    }
}


//collection creation
const User = mongoose.model('STUDENT',userSchema);

module.exports = User;

