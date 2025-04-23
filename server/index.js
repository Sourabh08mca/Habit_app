const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Habit_Tracker")

app.get('/' ,(req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.put('/habit/done/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, { done: true }, { new: true })
      .then(user => res.json(user))
      .catch(err => res.json(err));
  });
  

app.delete('/deleteUser/:id', (req,res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/habit", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.listen(3001, (req, res) => {
    console.log("Server is Running")
})