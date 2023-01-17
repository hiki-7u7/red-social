const {Comment,Image} = require('../models');

module.exports={

    async comentNuevos(){
        const comments = await Comment.find()
            .limit(5)
            .sort({timeStamp:-1}).lean()
        for (const comment of comments) {
            const image = await Image.findOne({_id:comment.id_img}).lean()
            comment.image = image
        }  
        return comments
    }
}