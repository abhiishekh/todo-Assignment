const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./router/todo')

const app = express()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Database connected")
}).catch(()=>{console.log("database connection error")})

app.use(express.json())
app.use(cors(['http://localhost:3000']))
app.use('/api/v1', router)

app.listen(PORT || 5000,()=>{
    console.log(`Server has been started on port ${PORT}`)
})
