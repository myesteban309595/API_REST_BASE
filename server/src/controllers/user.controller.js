const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {ObjectId} = mongoose.Types.ObjectId
const sendMail = require('../utils/sendEmail');

const user = require('../models/user.model')

exports.getUsers = async (req,res)=> {  
    const getUser = await user.find();
    res.json(getUser)
}

exports.createUser = async (req,res)=> {
    const {name,lastName, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);

    if(!name || !lastName || !email || !password){
        res.status(404).json('Ingrese informacion válida');
    }else{
        const validateUserExist = await user.findOne({email:email});
        if(validateUserExist){
            res.status(404).json('Este email ya existe');
        }else{
            const newUser = new user({
              name: name.charAt(0).toUpperCase()+(name.slice(1)).toLowerCase(),
              lastName: lastName.charAt(0).toUpperCase()+(lastName.slice(1)).toLowerCase(),
              email: email.toLowerCase(),
              password: passwordEncrypted,
            });
            newUser.save()
            res.status(201).json(newUser)
        }
    }
}

exports.editUser = async (req, res) => {
    try{
        const {_id} = req.params
        await user.updateOne({_id:_id}, req.body)
        .then(()=>res.json("Usuario actualizado"))
    } catch(error) {
        res.json({message: error.message})
    }
};

exports.deleteUser = async (req, res) => {
    try{
      const {id} = req.params
      await user.deleteOne({_id:id})
        .then(()=> res.json("Se ha eliminado el usuario"))
    } catch(error) {
        res.json({message: error.message})
    }
};

exports.forgotPassword = async (req, res) => {
    const {email} = req.body
    if(!(email)){
        return res.status(400).json('El correo es requerido')
    }else{
        const code = crypto.randomBytes(15).toString('hex');
        const token = jwt.sign({
            email: email
        },process.env.JWT_SECRET);
        //sendMail(email,code);
        res.status(200).json({token})
    }
}

exports.resetPassword = async (req, res) => {
     const { password, newPassword } = req.body;
     const {id} = req.params;
     const savedUser = await user.findOne({_id:id})
         try {
             if(bcrypt.compare(password, savedUser.password)){
                await user.updateOne({_id:id}, {$set : {"password" : await bcrypt.hash(newPassword, 10)}})
                 .then(()=> {
                     res.status(200).json('Se ha cambiado su contraseña Inicie sesión nuevamente') 
                 })
                }else {
                    return res.status(422).json("Contraseña incorrecta");
                }
            } catch (error) {
                console.log(error);
                res.json(error)
            }
};

exports.changePhoto = async (req, res) => {
    const {photo} = req.body
    const {id} = req.params

    const data = await user.findOne({_id:id})
    await user.updateOne({_id:id}, {$set:{"photo": photo}})
    .then((response)=> {
        res.status(200).json(data)
    })
    .catch(error=> {
        console.log(error);
    })
}
exports.getPhoto = async (req, res) => {
    const {id} = req.params

   await user.findOne({_id:id})
    .then((data)=> {
        res.status(200).json(data)
    })
    .catch(error=> {
        console.log(error);
    })
}