const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const urlSchema = new Schema({
    urlOriginal: {
        type: String,
        required: true
    }, 
    urlCorta: {
        type: String
    }
});

urlSchema.pre('save', function(next) {
    // Generar la URL corta antes de guardar
    this.urlCorta = shortid.generate();
    next();
});

module.exports = mongoose.model('Urls', urlSchema);
