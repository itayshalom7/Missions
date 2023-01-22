const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const PORT = 5000;

// { "_id" : ObjectId("61b8b941fc3240735fb026d4"), "username" : "asda", "name" : "dani", "phone" : 123124141, "password" : "123123", "email" : "eli@svcollege.co.il", "__v" : 0 }
// { "_id" : ObjectId("61b8ba29fc3240735fb026d5"), "username" : "Tim", "name" : "Tim", "phone" : 123456, "password" : "123456", "email" : "tim@f.f", "__v" : 0 }
// { "_id" : ObjectId("61b8bc0dbb0398749296e3ac"), "username" : "Tim", "name" : "Tim", "phone" : 123456, "password" : "123456", "email" : "tim@f.f", "__v" : 0 }

//user_infos

// mongoosestartnpm 
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err))


const userSchema = mongoose.Schema({
    username: String,
    password: String,
})

const User = mongoose.model("user_info", userSchema)

const missionSchema = mongoose.Schema({
    name: String,
    description: String,
    workerName: String,
    whoFinished: String,

})

const Mission = mongoose.model("missions", missionSchema)



app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))

// create 3 users - name, age, city, username, password
// const users = [
//     {username: "itay",  password: "123456"},
//     {username: "shani", password: "12345"},
// ]

// let products = [
//     {productName: "Pizza", price: 20},
//     {productName: "Burger", price: 30},
//     {productName: "Milksheak", price: 10}
// ]

// User.insertMany(users, ()=>{})


app.get('/', (req, res) => {
    res.send("works 2")
})

app.get('/api', (req, res) => {
    res.json({ message: "Message from server!" })
})

app.get('/api/getWorkersName', async (req, res) => {
    let data = await User.find({}, { "username": 1 })
    console.log(data)
    res.json(data)
})

app.get('/api/menu-missions', (req, res) => {
    Mission.find({}, (err, data) => {
        if (err) {
            throw err
        } else {
            res.json(data)
        }
    })
})

app.post('/api/finish-task', async (req, res) => {
    await Mission.updateOne({ description: req.body.description }, { $set: { whoFinished: req.body.whoFinished } })
        .then(async () => {
            res.json(await Mission.find())
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/api/add-mission', async (req, res) => {
    console.log(req.body)
    await Mission.insertMany([req.body], (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
            res.json(data)
        }
    })
})


// check login details
app.post('/api/login', async (req, res) => {
    let data = await User.find({ username: req.body.username, password: req.body.password })
    if (data.length > 0) {
        res.json({ isLogin: true, message: "User login" })
    } else {
        res.json({ isLogin: false, message: "User NOT login" })
    }
})


app.listen(PORT, () => console.log(`Server listen on port ${PORT}`))