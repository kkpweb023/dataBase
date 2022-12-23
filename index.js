const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 4000;
require('./Database/config');
const Products = require('./Database/ProductSchema');


const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }



app.get('/list-Product',async (req,res)=>{

    let data = await Products.find({});

    if(data.length > 0){
        res.send(data)
    }else{
        res.send("No data found");
    }
 
})







connectDB().app.listen(port,() => {
  console.log(`from port ${port}`)

})