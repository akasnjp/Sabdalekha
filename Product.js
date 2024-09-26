const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Product')
        .then(()=>{
            console.log("Connected")
        })
        .catch(err =>{
            console.error('Error',err);
        });

const productSchema = mongoose.Schema({
        name : String,
        quantity : Number,
        price : Number,
        image : String,
        description : String
});

const productModel = mongoose.model("items", productSchema);

app.get('/product', (req, res)=>{
    productModel.find().then(items =>{
        res.setHeader('X-custom-header',"value");
        res.json(items);
    });
});

//get product through id
app.get('/product/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await productModel.findById(id);
        res.status(200).json(products);
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

//update a product

app.put('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await productModel.findByIdAndUpdate(id, req.body);
        if(!products){
            return res.status(404).json({message: 'Error not found'})
        }
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})
app.listen(4000, ()=>{
    console.log("Node running on port number 4000")
})

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const app = express();
// const cors = require('cors');

// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error', err));

// const UserSchema = mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const UserModel = mongoose.model('users', UserSchema);

// // Signup route
// app.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new UserModel({ name, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).send('User Created');
//   } catch (error) {
//     res.status(500).send('Error creating user');
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(400).send('User not found');
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');
    
//     const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).send('Error logging in');
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
