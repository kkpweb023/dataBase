const express = require('express')
const app = express()
const port = process.env.PORT || 4000;



app.get('/list-Product',async (req,res)=>{

    let data = "Hello";

        res.send(data)
 
 
})



app.listen(port,() => {
  console.log(`from port ${port}`)

})