var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    id : { type: String },
    title: {type: String},
    abstract: {type: String},
    noteurl: {type: String},
    img: {type: String},
    nickname: {type: String},
    comments : { type: String} ,
    likes : { type: String} ,
    money : { type: String} ,
});

module.exports = NoteSchema;