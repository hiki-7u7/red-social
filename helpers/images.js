const {Image} = require('../models')

module.exports={

    async popular(){
        const imagenes = await Image.find()
            .limit(6)
            .sort({likes:-1}).lean()
        return imagenes    
    }
}