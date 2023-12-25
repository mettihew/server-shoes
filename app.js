const express = require('express')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const cors = require('cors')
require('dotenv').config()
require('./mongoDB')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRoute)
app.use('/product', productRoute)

app.listen(4000, () => console.log('Connected to 4000'))
