const dotenv = require('dotenv');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// const cookieParser = require('cookieParser'); 
// app.use(cookieParser()) ;

const cookieparser=require("cookie-parser");
app.use(cookieparser());

dotenv.config({path:'./config.env'});
require ('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;



//Middleware

// const middleware = (req,res,next) => {
//     console.log('Hello Middleware');
//     next();
// }


// app.get('/',(req,res)=>{
//     res.send('Hello World from the Server');
// })

// app.get('/details', (req,res)=>{
//     console.log('HelloAbout');
//     res.send('Hello Details World from the Server');
// })

// app.get('/report',(req,res)=>{
//     res.send('Hello Report World from the Server');
// })

app.get('/signin',(req,res)=>{
    res.send('Hello Login World from the Server');
})

app.get('/signup',(req,res)=>{
    res.send('Hello Register World from the Server');
})



app.listen(PORT, ()=> {
    console.log(`Now server is running at port ${PORT}`);
})

