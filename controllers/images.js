const path = require('path')
const { v4: uuidv4 } = require('uuid');
const fsExtra = require('fs-extra')
const fs = require('fs')
const md5 = require('md5')
const {Image,Comment} = require('../models')
const {response} = require('express')

const sideBar = require('../helpers/sidebar')

const home = async (req,res)=>{
    const images = await Image.find().sort({timeStamp:-1}).lean();
    let viewModel = {images : []};
    viewModel.images = images;
    viewModel = await sideBar(viewModel)
    res.render('index',viewModel);

}


const obtenerImagen = async(req,res)=>{
    let viewModel = {image:{},comment:{}}
    const {id_img} = req.params
    const imagen = await Image.findOne({name:id_img}).lean();
    if(imagen){
        const viewUpdate = await Image.findByIdAndUpdate(imagen._id,{views:imagen.views + 1 },{returnDocument:'after'}).lean();
        viewModel.image = viewUpdate;
        const comment = await Comment.find({id_img:imagen._id}).lean();
        viewModel.comment = comment;
        viewModel = await sideBar(viewModel);
        console.log(viewModel);
        res.render('image',  viewModel);
    }else{
        res.redirect('/')
    }
}

const crearImagen = async (req,res = response)=>{
    console.log(req.file);
    const imageTempPath = req.file.path;
    const nameFile = req.file.originalname.split('.');
    const extencion = nameFile[nameFile.length - 1];
    const nameFinal = uuidv4()
    const targetPath = path.resolve(`public/upload/${nameFinal}.${extencion}`)
    
    if(extencion === 'png' || extencion === 'jpg' || extencion === 'gif'){

        try {

            await fsExtra.rename(imageTempPath,targetPath)
            const newImg = new Image({
                title    : req.body.title,
                desc     : req.body.description,
                filename : `${nameFinal}.${extencion}`,
                name     : nameFinal
            })
    
            await newImg.save()
    
            res.redirect('/')
            
        } catch (error) {
            
            res.json({
                msg:error
            })

        }

    }else{
        res.status(400).send('Error la extension no es permitida')
    }

}

const likeImagen = async(req,res)=>{
    const {id_img} = req.params;
    const imagen = await Image.findOne({name:id_img})
    if(imagen){
        const like = await Image.findByIdAndUpdate(imagen._id,{likes: imagen.likes + 1},{returnDocument:'after'}).lean()
        res.json({
            like:like.likes
        })
    }else{
        res.status(500).json({
            msg:'Internal server error'
        })
    }
}

const comentarImagen = async(req,res)=>{
    const imagen = await Image.findOne({name:req.params.id_img})
    if(imagen){
        const newCommet = new Comment(req.body);
        newCommet.gravatar = md5(newCommet.email)
        newCommet.id_img = imagen._id
        await newCommet.save()
        res.redirect(`/pin/${imagen.name}`)
    }

}

const borrarImagen = async (req,res)=>{
    const imagen = await Image.findOne({name:req.params.id_img})

    if(imagen){
        fs.unlinkSync(path.resolve('./public/upload/' + imagen.filename))
        await Comment.deleteOne({id_img:imagen._id})
        await imagen.remove();
        res.json(true)
    }
}

module.exports = {
    obtenerImagen,
    crearImagen,
    likeImagen,
    comentarImagen,
    borrarImagen,
    home
}