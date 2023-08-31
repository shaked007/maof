const { MongoClient ,ObjectId } = require("mongodb");

const mongoClient = new MongoClient('mongodb+srv://shakedbuk:AqWTlymx9DT7ESrD@cluster0.ffork.mongodb.net/?retryWrites=true&w=majority');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.get("/items",async (req,res,next)=>{
    const clientPromise = mongoClient.connect();

    const database = (await clientPromise).db('todo');
        const collection = database.collection('todo');
        const results = await collection.find({}).toArray();
        (await clientPromise).close()
    res.json(results)

});
app.post("/items",async (req,res)=>{
    const clientPromise = mongoClient.connect();
    const body = req.body
    const database = (await clientPromise).db('todo');
        const collection = database.collection('todo');
        const results = await collection.insertOne(body)
           res.json({_id:results.insertedId,name:req.body.name})
   

});
app.put("/items/:id",async (req,res,next)=>{
    const clientPromise = mongoClient.connect();

    const id =req.params.id
    const name =req.body.name
    const database = (await clientPromise).db('todo');
    const collection = database.collection('todo');
    const results= await collection.updateOne({ _id:new ObjectId(id)},{"$set":{"name":name}})
    res.json({name:req.body.name, _id:new ObjectId(id)})

})
app.delete("/items/:id/",async (req,res,next)=>{
    const id =req.params.id
    console.log(id)

    const clientPromise = mongoClient.connect();
    // console.log(id,  new ObjectId(id ))
    const database = (await clientPromise).db('todo');
        const collection = database.collection('todo');
        const results = await collection.deleteOne({ _id:new ObjectId(id)})
        console.log(results)
        res.json(results)
        

});


app.listen(3001);
