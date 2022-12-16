const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const user = mongoose.model('user')
const config = require('../config/config')

module.exports = (req,res,next)=> {

    const {authorization} = req.headers
    const accessToken = authorization
    if(!accessToken){
       return res.status(401).json("No se encuentra loggeado");
    }
    try{
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
         if(err){
            res.send('Accedo Denegado, token expirado o incorrecto')
         }else{
            req.user = user;
            next();
         }
       })
    }
    catch (error) {
        return res.status(403).json("Token invalido");
    }
}