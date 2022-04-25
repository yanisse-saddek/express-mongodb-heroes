const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const heroModel = require('./model/hero')
const heroList = require('./heroList.js')
app.use(morgan)
app.use(cors)
app.use(express.urlencoded());

async function conn (){
 await mongoose.connect('mongodb://localhost:27017/heroes')
}
conn()

heroModel.insertMany(heroList).then(res=>console.log(res))

app.listen(3000)