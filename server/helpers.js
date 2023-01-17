const moment = require('moment')

const timeago = timestamp =>{
    return moment(timestamp).startOf('minute').fromNow()
}

module.exports={
    timeago
}