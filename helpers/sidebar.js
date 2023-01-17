const Comments = require('./comments')
const Images   = require('./images')
const Stats    = require('./stats')

module.exports = async viewModel => {
    
    const result = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.comentNuevos()
    ])

    viewModel.sideBar = {
        stats   : result[0],
        popular : result[1],
        commets : result[2]
    }

    return viewModel
}