const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const heroModel = require('./model/hero')
const heroList = require('./heroList.js')
app.use(express.urlencoded({extended: false}))
async function conn (){
 await mongoose.connect('mongodb://localhost:27017/heroes')
}
conn()

// heroModel.insertMany(heroList)

app.get('/heroes', (req, res, next)=>{
    heroModel.find({}).then(data=>{
        res.json(data)
    })
})

app.get('/heroes/:slug', (req, res, next)=>{
    heroModel.find({slug:req.params.slug}).then(data=>{
        res.json(data)
    })
})
app.get('/heroes/:slug/powers', (req, res, next)=>{
    heroModel.find({slug:req.params.slug}).then(data=>{
        res.json(data[0].power)
    })
})

const checkIfExist = (req, res, next)=>{
    heroModel.find({name:req.body.name}).then(ok=>{console.log(ok)})
    next()
}
app.post('/heroes', checkIfExist,(req, res, next)=>{
    const data = req.body
    const hero = new heroModel({
        slug: data.slug,
        name: data.name,
        power: data.power,
        color: data.color,
        isAlive: data.isAlive,
        age: data.age,
        image: data.image
    })
    // hero.save()    
    res.send(hero)
})

app.post('/heroes/:slug/powers', (req, res, next)=>{
    const data = req.body
    heroModel.findOneAndUpdate(
                {slug:req.params.slug},
                {$push:{power:data.power}},
                { new: true }
                )
             .then(data=>{
                res.json(data)
            })
})


app.listen(3000)
