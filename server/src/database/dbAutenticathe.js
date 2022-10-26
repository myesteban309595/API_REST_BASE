
const db = require('../database/db.js');

export default async function dbAutenticathe(){
    try{
        await db.authenticate()
        // console.log("db.authenticate():" , db.authenticate());
        console.log("conectado a la base de datos");
    }catch(error) {
       console.log("error al conectar a la base de datos")
    }
}