const {Comment,Image} = require('../models')

const imagesTotales = async()=>{
    return await Image.countDocuments();
}

const comentariosTotales = async()=>{
    return await Comment.countDocuments();
}

const likesTotales = async()=>{
    const results = await Image.aggregate([
        { $group: { _id: null, likesTotal: { $sum: "$likes"   }}},
    ])

    return results[0]?.likesTotal
}

const viewsTotales = async()=>{
    const results = await Image.aggregate([{$group:{
        _id:'1',
        viewsTotal:{$sum:"$views"}
    }}])

    return results[0]?.viewsTotal
}

module.exports= async()=>{
    const result = await Promise.all([
        imagesTotales(),
        comentariosTotales(),
        likesTotales(),
        viewsTotales()
    ])

    return {
        images:result[0],
        comments:result[1],
        likes:result[2],
        views:result[3]
    }
}
