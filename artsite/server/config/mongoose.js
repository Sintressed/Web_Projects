const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/artsite');
mongoose.connection.on('connected', function(){
    console.log('connected to mongoDB')
})
module.exports = mongoose;