const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const userRouter = require('./route/user.route.js');
const authRouter = require('./route/auth.route.js');
const messageRouter = require('./route/message.route.js');
const roleRouter = require('./route/role.route.js');
const {connect} = require('./framework/connection.js');
const sync = require('./framework/sync.js');

const database = async () => {
    await connect();
    await sync();
}

database();

app.use(express.json());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 10 minutes',
})

app.use(limiter);

app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/message',messageRouter);
app.use('/role',roleRouter);


module.exports = app;
