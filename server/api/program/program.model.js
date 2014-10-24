'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProgramSchema = new Schema({
  name: String,
  lastEdited : Date,
  created : {type: Date , default: Date.now},
  lessons : Array,
  active: Boolean
});

module.exports = mongoose.model('Program', ProgramSchema);