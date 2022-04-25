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
    heroModel.find({name:req.body.name}).then(data=>{
        if(data.length>0){
            console.log('ca existi')
            console.log(data)
        }else{
            console.log('existe po')
            next()
        }
    })
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
    hero.save()    
    res.send(hero)
})

app.put('/heroes/:slug/powers', (req, res, next)=>{
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

const checkIfNotExist = (req, res, next)=>{
    heroModel.deleteOne({slug:req.params.slug}).then(data=>{
        if(data.deletedCount>0){
            next()
        }
        else{
            const text = req.params.slug+ " n'existe pas dans la base de donnée"
            res.send(text)
        }
    })
}
app.post('/heroes/:slug', checkIfNotExist,(req, res, next)=>{
    const text = req.params.slug+ " à bien été supprimé"
    res.send(text)
})

const checkIfHeroExist = (req, res, next) =>{
    heroModel.find({slug:req.params.slug}).then(data=>{
        if(data.length>0){
            next()
        }
    })
}
const checkIfPowerExist = (req, res, next)=>{
    heroModel.updateOne(
        {slug:req.params.slug},
        { $pull: {power:req.params.power}}
    ).then(data=>{
        console.log(data)
        if(data.modifiedCount>0){
            next()
        }else{
            const text = `Erreur le pouvoir n'existe pas`
            res.send(text)        
        }
    })
}
app.post('/heroes/:slug/power/:power', checkIfHeroExist,checkIfPowerExist, (req, res, next)=>{
    const text = `Le pouvoir ${req.params.power} du héros ${req.params.slug} à été effacé correctement`
    res.send(text)
})


app.listen(3000)
