const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// Add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
// const userRouter = require('./routers/users');
const userRouter = require('./routers/users.js');

// app.use('/users', userRouter);
app.use('/users', userRouter)
app.use('/user', userRouter)
app.use('/', userRouter)

// Set up a default "catch all" route to use when someone visits a route
// that we haven't built
app.get('*', (req, res) => {
    res.json({ ok: true });
});

module.exports = app
