const express=require('express');
const dotenv=require('dotenv').config();
const cors=require('cors');
const {mongoose}=require('mongoose');
const cookieParser =require('cookie-parser')


const app= express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('databse connected'))
.catch((err)=>console.log('Databse is not connected',err))

//middle ware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))



app.use('/',require('./routes/Routes'))

const port=8000;
app.listen(port,()=>console.log(`server is running at ${port}`));