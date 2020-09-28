const mongoose = require('mongoose');
// var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const emojischema = new mongoose.Schema({
    dec: {
        type: Number,
        required: true

    },


});



module.exports = mongoose.model('emoji', emojischema)