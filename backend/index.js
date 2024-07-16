const express = require('express')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const cors=require('cors')
dotenv.config();
const app=express();
//Database Connection
const db = require('./Models/db');
const authRouter=require('./Routes/authRouter')
const productRouter = require('./Routes/productRouter')

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("Hello!");
});

app.use('/auth', authRouter);

app.use('/product', productRouter);





const PORT=process.env.PORT;
app.listen(PORT, (req, res)=>{console.log(`Server is running on PORT ${PORT}`)});