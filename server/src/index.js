const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const user_validation= require('./Routes/LoginandRegistration');
const { validateToken }= require('./Middleware/AuthenticationService/validateToken')
const app = express();

app.use(express.json());//middleware to parse request for content-type and assign it to req.body
app.use(cookieParser());// cookie-parser
app.use(cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
}));// to allow cross-origin interactions and resource sharing

app.use('/user', user_validation);//to route path specific request to path specific router to serve request

app.get('/', validateToken, (req, res) =>{
    try {
        res.json({'status': 'success', 'message': `welcome user ${req.username}` }).status(200);
    } catch (error) {
        res.json({'status': 'error', 'message': 'something went wrong in server side'}).status(500);
    }
});

app.listen(process.env.PORT, () =>{
    console.log(`server is listening on port:${process.env.PORT}`);
})