const express = require('express')
require('dotenv').config({path: './config/.env'})
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
require('./config/db.config')
const userRoute = require('./routes/user.route')
const cartRoute = require('./routes/cart.route')
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use('/users', userRoute)
app.use('/carts', cartRoute)



//serveur configuration
app.listen(PORT, () => {
    console.log(`serveur started ${PORT}`);
})