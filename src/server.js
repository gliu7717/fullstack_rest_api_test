import express from 'express'
import bodyParser from 'body-parser'
import {promises as fs} from 'fs'

import { people } from './people'

let app = express()
app.use(bodyParser.json())

app.get('/hello', (req,res)=>{
    res.send ("Hello!")
})
app.get('/people', (req,res)=>{
    res.json(people)
})

app.get('/people/:name', (req,res)=>{
    let {name} = req.params
    console.log(name)
    let person = people.find( x => x.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    console.log(person)
    res.json(person)
})


app.get('/file-data', async (req,res)=>{
    let data = await fs.readFile(__dirname + '/people-data.json')
    let people = JSON.parse(data)
    res.json(people)
})

app.post ('/people', (req, res) =>{
    let newPerson = req.body
    people.push(newPerson)
    res.json(people)
})

app.listen(3000, ()=>{
    console.log("started server and listening on  port 3000")
} )