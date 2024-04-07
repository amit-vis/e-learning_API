const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const swagger = require('swagger-ui-express');
const app = express();
const port = 5500;
const db = require('./config/database');
const PassportJWT = require('./config/passport-jwt');
const adminPassportJWT = require('./config/passport-jwt-admin');
const logData = require('./config/logger').logData
const {errorHandlerMiddleware} = require('./config/errorHandler');
const {invalidRoutesHandlerMiddleware} = require('./config/invalidRoutesMiddleware');
const apiDocs = require('./swagger.json');

app.use(express.json())

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))

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