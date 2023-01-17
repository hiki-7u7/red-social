const {Schema,model} = require('mongoose');

const CommetSchema = new Schema({
    email:{type:String},
    name:{type:String},
    gravatar:{type:String},
    timeStamp:{type:Date,default:Date.now()},
    id_img:{type:Schema.Types.ObjectId},
    comment:{type:String}
})

module.exports=model('Comment',CommetSchema)