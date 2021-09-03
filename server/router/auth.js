const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require ('../model/userSchema');

router.get('/', (req,res)=>{
    res.send(`Hello World from server router js`);
});

//using promises
// router.post('/register',(req,res)=>{
//     const { name, email, phone, branch, year, rollno, password, cpassword } = req.body;
//     if(!name || !email || !phone || !branch || !year || !rollno || !password || !cpassword){
//         return res.status(422).json({error: "Please fill all the fields"})
//     }
//     User.findOne({email:email})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "Email already exists"})
//         }

//         const user = new User({ name, email, phone, branch, year, rollno, password, cpassword });

//         user.save().then(()=>{
//             res.status(201).json({message:"User registered successfully"});
//         }).catch((err)=>
//             res.status(500).json({error:"Failed to register"}))
//     }).catch((err)=>{console.log(err);});
// })

//async-await
router.post('/register', async(req,res)=>{
    const { name, email, phone, branch, year, rollno, password, cpassword } = req.body;
    if(!name || !email || !phone || !branch || !year || !rollno || !password || !cpassword){
        return res.status(422).json({error: "Please fill all the fields"})
    }

    try{
        let token;
     const userExist = await  User.findOne({email:email});

     if(userExist){
        return res.status(422).json({error: "Email already exists"})
    }else if(password != cpassword){
        return res.status(422).json({error:"Passwords are not matching"})
    }else{
        const user = new User({ name, email, phone, branch, year, rollno, password, cpassword });
        await user.save();
        res.status(201).json({message:"User registered successfully"});
        }
    }catch(err){
        console.log(err);
    }
  
})

//login route

router.post('/signin', async(req,res) => {
    try{
const {email,password} = req.body;

if(!email || !password){
return res.status(400).json({error:"Please fill the credentials"})
}

const userLogin = await User.findOne({email:email});




if(userLogin){
    const isMatch = await bcrypt.compare(password,userLogin.password);

    const token = await userLogin.generateAuthToken();
    console.log(token);

    res.cookie('jwtoken',token, {
        expires:new Date(Date.now()+ 25892000000),
        httpOnly:true
    })

    if(!isMatch){
        res.status(400).json({message:"Error in Signin"})
    }else{
        res.json({message:"Login Successful"})
    }
    
}else{
    res.status(400).json({message:"Error in Signin"})
}
    }catch(err){console.log(err);}
})

//about us page


router.get('/details', authenticate ,(req,res)=>{
    console.log('HelloAbout');
    res.send(req.rootUser);
});

// get user data for grievance and home page

router.get('/getData', authenticate, (req,res)=>{
    console.log('HelloAbout');
    res.send(req.rootUser);
});

//grievance page


router.post('/grievance',authenticate, async(req,res)=>{
  try{
      const {name, rollno, email, message} = req.body;

      if(!name || !rollno || !email || !message){
          console.log("Error in contact form");
          return res.json({error:"Please fill the contact form"})
      }
      const userContact = await User.findOne({_id:req.userId});

      if(userContact){
          const userMessage = await userContact.addMessage(name, rollno, email, message);
          await userContact.save();
          res.status(201).json({message:"User contact established"});
      }

  }catch(error)  {
      console.log(error);

  }
})


module.exports = router;