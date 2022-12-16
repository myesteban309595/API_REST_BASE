const express = require('express')
const route = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const product = require('../models/products.model')

//crear un producto
route.post('/createProduct', requireLogin,(req,res)=> {
    const {url, name, price, qualification} = req.body
    if(!url || !name || !price || !qualification){
        return res.status(422).json("por favor ingrese campos válidos");
    }
    req.user.password = undefined  // ocultar la password en el result
    
    const producto = new product({
        url: url,
        name: name.charAt(0).toUpperCase()+(name.slice(1)).toLowerCase(),
        price: price,
        qualification: qualification,
        postedBy: req.user._id
    })
    producto.save()
    .then( data => {
        res.json("Producto creado exitosamente")
    })
    .catch(err=> {
        console.log(err);
    })
});

// visualizar  mis productos
route.get('/myProducts', requireLogin, (req,res)=> {
    product.find({postedBy:req.user._id})
    .populate("postedBy", "_id name") // al aplicar populate, me muestra todo el objeto del objetId y puedo limintar sus datos a mostrar
    .then(myproducts=> {
       res.status(200).json({myproducts})
    })
    .catch(err=> {
        console.log(err);
    })
});

// visualizar todos los productos
route.get('/allproducts', requireLogin, (req,res)=> {
    product.find()
    .populate("postedBy", "_id url name price qualification") 
    .then(products=> {
        res.json(products)
    })
    .catch(err=> {
        console.log(err);
    })
});

route.put('/edit/:id', requireLogin, (req, res) => {

    try{
        const {id} = req.params
        const updateProduct = product.updateOne({_id:id}, req.body)
        .then(()=>res.json("Se ha actualizado el producto correctamente"))
    } catch(error) {
        res.json({message: error.message})
    }
});

route.delete('/deleteproduct/:id', requireLogin, (req, res) => {

    try{
        const {id} = req.params
        const deleteproduct = product.deleteOne({_id:id})
        .then(()=> res.json("Se ha eliminado el producto correctamente"))
    } catch(error) {
        res.json({message: error.message})
    }
});

module.exports = route