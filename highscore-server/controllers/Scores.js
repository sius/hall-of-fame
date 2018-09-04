'use strict';

var utils = require('../utils/writer.js');
var Scores = require('../service/ScoresService');

module.exports.createScore = function createScore (req, res, next) {
  var score = req.swagger.params['score'].value;
  Scores.createScore(score)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findScores = function findScores (req, res, next) {
  var $skip = req.swagger.params['$skip'].value;
  var $top = req.swagger.params['$top'].value;
  Scores.findScores($skip,$top)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getScore = function getScore (req, res, next) {
  var id = req.swagger.params['id'].value;
  Scores.getScore(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeScore = function removeScore (req, res, next) {
  var id = req.swagger.params['id'].value;
  Scores.removeScore(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateScore = function updateScore (req, res, next) {
  var id = req.swagger.params['id'].value;
  var score = req.swagger.params['score'].value;
  Scores.updateScore(id,score)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
