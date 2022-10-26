const express = require('express');
const cors = require('cors')
const config = require('./config')
const mysql = require('mysql2');
const myconn = require('express-myconnection')

const dbOptions = require('./database/db')
const app = express();

console.log(dbOptions);

const PORT = config.module.PORT || 6060

//* ****   midleware   *********
app.use(express.json());
app.use(cors());
app.use(myconn(mysql,dbOptions,'single'));

//~ *********** RUTAS *********
app.get('/', (req,res)=>{
    res.send('hola desde el servidor')
})

//^ autenticacion conexion a la base de datos
//dbAutenticathe()

app.listen(PORT, ()=> {
    console.log(`connected on port ${PORT}`)
})