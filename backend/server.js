import bodyParser from 'body-parser';
import express from 'express';
import data from './data';
import userRoute from './routes/userRoute';
// import dotenv from 'dotenv'
// import config from './config'

const mongoose = require('mongoose');
var url = 'mongodb+srv://anhardi:anhar123@cluster0.va9w2.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
 .then(() => console.log('Connected successfully to MongoDB!'))
 .catch(err => console.error('Something went wrong', err));



const app = express(); 
app.use(bodyParser.json());
app.use('/api/users',userRoute);
app.get("/api/products" ,(req,res) =>{
    console.log('products');
    res.send(data.products);
});
app.get("/api/products/:id" ,(req,res) =>{
    console.log(1);
    const productId =req.params.id;
    const product =data.products.find(x=>x._id===productId);
    // find the product by the id and if it`s noy found return msg
    if(product){
        res.send(product);
    }else{
        res.status(404).send({msg:"Prodcut Not Found"}) ;
    }
});
app.get("/api/searchproducts/:name" ,(req,res) =>{
    const searchTerm = req.params.name;
    console.log(searchTerm);
    
    const product =data.products.filter(x => x.name.indexOf(searchTerm)!==-1 );
    // const product =data.products.find({name:{$regex:searchTerm,$options:'$i'}});
    console.log(product);
    // find the product by the id and if it`s noy found return msg
    if(product){
        res.status(200).send(product);
    }
    else{
        res.status(404).send({msg:"Prodcut Not Found"}) 
    }
    
});
app.listen(5011, ()=> {
    console.log('My app is listening on port 5011!');
});