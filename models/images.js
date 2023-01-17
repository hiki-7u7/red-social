const {Schema,model} = require('mongoose');
const path = require('path')

const ImageSchema = new Schema({
    title:{
        type:String,
        required: [true,"tuturu okarin"]
    },
    filename:{
        type:String,
        required: [true,"tuturu okarin"]
    },
    name:{
        type:String,
    },
    desc:{
        type:String,
        required: [true,"tuturu okarin"]
    },
    likes:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    },
    timeStamp:{
        type:Date,
        default:Date.now()
    }
})

ImageSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename))
    })

module.exports = model('Image',ImageSchema)