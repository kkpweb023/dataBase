const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
require('./Database/config');
const Products = require('./Database/ProductSchema');


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