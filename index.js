const express = require('express');
const app = express();
const port = 5500;
const db = require('./config/database');
const bodyParser = require('body-parser');
const PassportJWT = require('./config/passport-jwt');
const adminPassportJWT = require('./config/passport-jwt-admin');
const fileUpload = require('express-fileupload');
const logData = require('./config/logger').logData
const {errorHandlerMiddleware} = require('./config/errorHandler');
const {invalidRoutesHandlerMiddleware} = require('./config/invalidRoutesMiddleware')

app.use(express.json())

app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true
}))

app.use(logData)
app.use('/', require('./routes'));

app.use(errorHandlerMiddleware)
app.use(invalidRoutesHandlerMiddleware);
app.listen(port, (err)=>{
    if(err){
        console.log("server not listening the port")
    }
    console.log("server is successfull listen the port", port)
})