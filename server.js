// console.log("Hello Jyotiprakash");
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res)=> {
    res.send("Hello Node API")
})

app.get('/blog', (req, res)=> {
    res.send("Hello Blog, I am Jyotiprakash")
})


mongoose.connect('mongodb://localhost:27017/crud')
    .then(()=> {
        console.log('Connected to MongoDB successfully!')
    })
    .catch(err => {
        console.error('Error', err);
        
    });

const UserSchema = mongoose.Schema({
    name : String,
    role : String
})

const UserModel = mongoose.model("users", UserSchema)

// app.get("/getUsers", (req, res) => {
//     res.json(UserModel.find({}).then(function(users){
//         res.json(users)
//     })).catch((error) =>{
//     console.log(error)
//     })
// })
app.get('/users', (req, res)=>{
    UserModel.find().then(users =>{
        res.setHeader('X-Custom-Header', 'value');
        res.json(users);
    });
});

// app.post('/product', (req,res)=>{
//     console.log(req.body)
//     res.send(req.body)
// })

app.listen(3000, ()=>{
    console.log("Node API is running on port number 3000");
})

