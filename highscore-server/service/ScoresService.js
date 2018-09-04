'use strict';

var Datasource = require('nedb')
  , db = new Datasource({
    filename: '../db/scores.db',
    autoload: true
  })
  , rwc = require('../utils/writer').respondWithCode;

/**
 * create a new score
 *
 * score Score 
 * no response value expected for this operation
 **/
exports.createScore = function(score) {
  return new Promise(function(resolve, reject) {
    db.insert(score, (err, doc) => {
      if (err) {
        reject(rwc(500, { message: 'unable to insert score', error: err }));
      }
      resolve(rwc(201, null));
    })
  });
}


/**
 * return a list of scores
 *
 * $skip BigDecimal  (optional)
 * $top BigDecimal  (optional)
 * returns List
 **/
exports.findScores = function($skip,$top) {
  return new Promise(function(resolve, reject) {
    db.find({}).sort({ points: -1 }).skip($skip).limit($top).exec(function(err, docs) {
      if (err) {
        reject(rwc(500, { message: 'unexpected error', error: err }));
      }
      resolve(rwc(200, docs));
    });
  });
}


/**
 * get an existing score
 *
 * id String 
 * returns Score
 **/
exports.getScore = function(id) {
  return new Promise(function(resolve, reject) {
    db.findOne({_id: id}, {}, (err, doc) => {
      if (err) {
        reject(rwc(404, { message: 'object not found', error: err }));
      }
      resolve(rwc(200, doc));
    })
  });
}


/**
 * remove an existing score
 *
 * id String 
 * no response value expected for this operation
 **/
exports.removeScore = function(id) {
  return new Promise(function(resolve, reject) {
    db.remove({_id: id}, (err, numRemoved) => {
      if (err) {
        reject(rwc(404, { message: 'object not found', error: err }));
      }
      resolve(rwc(204, null));
    })
  });
}


/**
 * update an existing score
 *
 * id String 
 * score Score 
 * no response value expected for this operation
 **/
exports.updateScore = function(id,score) {
  return new Promise(function(resolve, reject) {
    db.update({_id: id}, score, {}, (err, numChanged) => {
      if (err) {
        reject(rwc(404, { message: 'object not found', error: err }));
      }
      resolve(rwc(204, null));
    })
  });
}
