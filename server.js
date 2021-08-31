require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8001;

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(
    MONGODB_URI,
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

app.get('/api', (req, res) => {
    res.status(200).json({ api: 'version 1' })
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE, PATCH')
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    next();
})
app.use(express.json());

const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

const zalandoProducts = require('./routes/zalando')
app.use('/zalando', zalandoProducts)

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`-------------------------`)
    console.log(`Server started on ${port}`)
    console.log(`-------------------------`)
});