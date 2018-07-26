var mongoose = require('mongoose')
var NoteSchema = require('../schemas/noteSchema')
var Note = mongoose.model('Note',NoteSchema)

module.exports = Note