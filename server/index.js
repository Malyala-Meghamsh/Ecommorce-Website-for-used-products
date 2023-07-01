// Imports

const express = require('express');
const app = express();
const PORT = 5000;
const dbConfig = require('./config/dbConfig');
const cors = require('cors');
//Middlewares

app.use(express.json());
app.use(cors());
//Routes

// Routes : 
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const productsRouter = require('./routes/products');

// Routes initialize : 

app.use('/product', productsRouter);
app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// Server starting
app.listen(PORT, ()=>{
    console.log("Node JS Server is running on port : " + PORT );
});