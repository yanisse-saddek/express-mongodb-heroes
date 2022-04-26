const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const heroModel = require('./model/hero')
const heroList = require('./heroList.js')
app.use(express.urlencoded({extended: false}))
app.use(cors())
// app.use(morgan())
async function conn (){
 await mongoose.connect('mongodb://localhost:27017/heroes')
}
conn()

// heroModel.insertMany(heroList)
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
        if(data.modifiedCount>0){
            next()
        }else{
            const text = `Erreur le pouvoir n'existe pas`
            res.send(text)        
        }
    })
}
const checkIfExist = (req, res, next)=>{
    const data = JSON.parse(Object.keys(req.body))

    heroModel.find({name:data.name}).then(data=>{
        if(data.length>0){
            res.send('Le hero existe deja')
        }else{
            next()
        }
    })
}
const validateHero = (req, res, next)=>{
    const data = JSON.parse(Object.keys(req.body))
        if(data.slug && data.name && data.power && data.color  && data.age && data.image){
            next()
        }else{
            res.send('erreur de syntaxe ')
        }
}
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
app.post('/heroes', checkIfExist ,validateHero,  (req, res, next)=>{
    const data = JSON.parse(Object.keys(req.body))
    const hero = new heroModel({
        slug: data.slug,
        name: data.name,
        power: data.power,
        color: data.color,
        age: data.age,
        image: data.image
    })
    hero.save()
    res.send(hero)
})
app.put('/heroes/:slug/powers', validateHero,  (req, res, next)=>{
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


app.delete('/heroes/:slug', checkIfNotExist, validateHero, (req, res, next)=>{
    const text = req.params.slug+ " à bien été supprimé"
    res.send(text)
})
app.delete('/heroes/:slug/power/:power', checkIfHeroExist,checkIfPowerExist, validateHero, (req, res, next)=>{
    const text = `Le pouvoir ${req.params.power} du héros ${req.params.slug} à été effacé correctement`
    res.send(text)
})
app.put('/heroes/:slug',validateHero,  (req, res, next)=>{
    const body = req.body
    heroModel.updateMany({},
                {
                slug:body.slug,
                name:body.name,
                power:body.power,
                color:body.color,
                isAlive:body.isAlive,
                age:body.age,
                image:body.image    
            }                
        )
    res.send('oki')
})

app.listen(4000)
