const express = require('express');
const route = express.Router();

const {getUsers, createUser, deleteUser, editUser, resetPassword, changePhoto, getPhoto, forgotPassword } = require('../controllers/user.controller');

route.get('/', getUsers);  
route.post('/registrar', createUser);
route.delete('/:id', deleteUser);
route.put('/:id', editUser);
route.patch('/reset/:id', resetPassword)
route.patch('/changephoto/:id', changePhoto)
route.get('/getphoto/:id', getPhoto)
route.post('/forgot', forgotPassword)
route.patch('/recovery/:id', )

module.exports = route