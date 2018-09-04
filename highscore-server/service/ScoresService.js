'use strict';


/**
 * create a new score
 *
 * score Score 
 * no response value expected for this operation
 **/
exports.createScore = function(score) {
  return new Promise(function(resolve, reject) {
    resolve();
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
    var examples = {};
    examples['application/json'] = [ {
  "player" : "Nine Pins",
  "points" : 369
}, {
  "player" : "Nine Pins",
  "points" : 369
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = {
  "player" : "Nine Pins",
  "points" : 369
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    resolve();
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
    resolve();
  });
}

