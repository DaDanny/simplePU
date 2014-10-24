'use strict';

var _ = require('lodash');
var Program = require('./program.model');

// Get list of programs
exports.index = function(req, res) {
  Program.find(function (err, programs) {
    if(err) { return handleError(res, err); }
    return res.json(200, programs);
  });
};

// Get a single program
exports.show = function(req, res) {
  Program.findById(req.params.id, function (err, program) {
    if(err) { return handleError(res, err); }
    if(!program) { return res.send(404); }
    return res.json(program);
  });
};

// Creates a new program in the DB.
exports.create = function(req, res) {
  Program.create(req.body, function(err, program) {
    if(err) { return handleError(res, err); }
    return res.json(201, program);
  });
};

// Updates an existing program in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Program.findById(req.params.id, function (err, program) {
    if (err) { return handleError(res, err); }
    if(!program) { return res.send(404); }
    var updated = _.merge(program, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, program);
    });
  });
};

// Deletes a program from the DB.
exports.destroy = function(req, res) {
  Program.findById(req.params.id, function (err, program) {
    if(err) { return handleError(res, err); }
    if(!program) { return res.send(404); }
    program.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}