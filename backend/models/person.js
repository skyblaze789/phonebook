require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery',false)


const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(result =>{
        console.log(`connected to MongoDb`);
    })
    .catch(error=>{
        console.log(`error connecting to MongoDB: `,error.message);
    })


const personSchema = new mongoose.Schema({
    name:{
        minLength:3,
        type:String,
        required:true
    } ,
    number: {
        minLength:10,
        type:Number,
        required:true
    }
})

personSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports =  mongoose.model('Person',personSchema);


