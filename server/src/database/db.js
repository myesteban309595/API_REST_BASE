const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const config = require('../config/config');
const userModel = require('../models/user.model');

const DB_CREDENTIALS_PASSWORD = config.module.DB_CREDENTIALS_PASSWORD;
const DB_CREDENTIALS_USER = config.module.DB_CREDENTIALS_USER;

const DB_URL_CONNECTION = `mongodb+srv://${DB_CREDENTIALS_USER}:${DB_CREDENTIALS_PASSWORD}@cluster0.groubjk.mongodb.net/?retryWrites=true&w=majority` ;

(async()=>{
    await mongoose.connect(DB_URL_CONNECTION,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("conectado a la base de datos")
    })
    .catch((error) => {
        console.error(error)
    });

    const existingUser = await userModel.find();

    if(existingUser.length === 0)
    {
      const salt = await bcrypt.genSalt(10);
      const passwordEncrypted = await bcrypt.hash(config.module.ADMIN_PASSWORD, salt);

        const user1 = new userModel({
           name: "marlon yoel",
           lastName: "esteban",
           age: 25,
           email: "maryoe_95@hotmail.com",
           password: passwordEncrypted,
           admin: true,
           products: []
        }) 
        user1.save()
    }
})();