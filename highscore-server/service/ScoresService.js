'use strict';

var Datasource = require('nedb')
  , rwc = require('../utils/writer').respondWithCode
  , dbFile = process.env.DB_FILE || '../db/scores.db'
  , db = (process.env.DB_FILE )
    ? new Datasource({ filename: dbFile, autoload: true })
    : new Datasource()

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
      resolve(rwc(doc ? 200 : 404, doc));
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
      resolve(rwc(numRemoved === 1 ? 204 : 404, null));
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
      resolve(rwc(numChanged === 1 ? 204 : 404, null));
    })
  });
}
