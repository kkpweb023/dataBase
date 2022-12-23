const mongoose = require('mongoose');
const autoIncr = require('mongoose-auto-increment')


const RegSchema = new mongoose.Schema({

       _id:Number,
       name:String,
       phone:Number,
       email:String,
       password:String,
       image:String 
       
});




autoIncr.initialize(mongoose.connection);
RegSchema.plugin(autoIncr.plugin,'students')

module.exports = mongoose.model('register',RegSchema);
