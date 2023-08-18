require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const mongodb_Connection = require('./server/config/MongoDB')
const errorHandler = require('./server/middleware/Error')

const app = express();
const port = process.env.PORT || 1000

//Project Routes
const AuthRouter = require('./server/routes/AuthRoute');

//MongoDB Connection
mongodb_Connection();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routers Middleware 
app.use("/api", AuthRouter);

//Error Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Pocetna');
})
app.listen(port, () => {
    console.log(`Radi na ${port} portu`)
})