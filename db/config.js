const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        

        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log('base de datos iniciada');


    } catch (error) {

        throw new Error('Error al iniciar la DB');

    }
}

module.exports = {
    dbConnection
}