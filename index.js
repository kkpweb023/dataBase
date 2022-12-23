const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
require('./Database/config');
const Products = require('./Database/ProductSchema');
const User = require('./Database/RegSchema');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();


app.post('/register',jsonParser, async (req, res) => {

    const user = await User.findOne({email:req.body.email});
    if(user){
        res.send("Email already registered");
    }else if(req.body.email=="") {
        res.send("Email Required");  
    }
    else {
        let data = new User({
           
            _id:Math.floor(Math.random() * 1000000000),
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            image:"",
        })
        let user = await data.save();
        user = user.toObject();
        delete user.password;
        res.send(user)
    }
})


app.post('/login', jsonParser, async (req, res) => {

    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send("Please signup");
        }
    } else {
        res.send("Enter correct Email and Password");
    }
})








app.get('/list-Product',async (req,res)=>{

    let data = await Products.find({});

    if(data.length > 0){
        res.send(data)
    }else{
        res.send("No data found");
    }
 
})



app.listen(port,() => {
  console.log(`from port ${port}`)

})