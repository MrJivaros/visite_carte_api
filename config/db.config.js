const mongoose = require('mongoose')
require('dotenv').config({ path: './config/.env' })
let url = ""
let isOnline = parseInt(process.env.DEBUG || '1')

if (isOnline == 1) {
    url = process.env.URI
} else {
    url = "mongodb://localhost:27017/data"
}

mongoose
    .connect(
        url,
        { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    )
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log('error to connected to mongo :' + err))