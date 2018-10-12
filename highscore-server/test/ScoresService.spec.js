 'use strict';

var ScoresService = require('../service/ScoresService'),
  supertest = require('supertest'),
  expect = require('chai').expect,
  faker = require('faker'),
  verbose = process.env.VERBOSE_TEST || 'false',
  log = (message) => {
    if (verbose.toLowerCase() === 'true') {
      console.log(message)
    }
  };

describe("ScoresService", () => {

  it('should export a "createScore" function', () => {
    expect(ScoresService.createScore).to.be.a('function');
  })

  it('should export a "findScores" function', () => {
    expect(ScoresService.findScores).to.be.a('function');
  })

  it('should export a "getScore" function', () => {
    expect(ScoresService.getScore).to.be.a('function');
  })

  it('should export a "updateScore" function', () => {
    expect(ScoresService.updateScore).to.be.a('function');
  })

  it('should export a "removeScore" function', () => {
    expect(ScoresService.removeScore).to.be.a('function');
  })
})

describe("HTTP Request", () => {

  var request = supertest(require('../index').app)

  before('do something before ...', done => {
    done();
  })

  describe('POST /api/v1/scores', () => {
    it('should create a Score', done => {
      
      var Score = {
        player: faker.name.findName(),
        points: faker.random.number({ min: 0, max: 10000 })
      }
      
      request.post('/api/v1/scores')
        .send(Score)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).is.empty;
          done();
        })
    })

    it('invalid score data fails validation, creates a Fault message and return statusCode 400 ', done => {
      
      var Score = {
        player1: faker.name.findName(),
        points: null
      }
      
      request.post('/api/v1/scores')
        .send(Score)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          
          let fault = res.body
          expect(fault).is.not.empty
          expect(fault.message).equals('Missing required property: player')
          expect(fault.code).equals('OBJECT_MISSING_REQUIRED_PROPERTY')
          expect(fault.error.failedValidation).is.true;
          
          var err0 = fault.error.results.errors[0];
          var err1 = fault.error.results.errors[1];
          expect(err0.code).equals('OBJECT_MISSING_REQUIRED_PROPERTY')
          expect(err0.message).equals('Missing required property: player');
          expect(err1.code).equals('INVALID_TYPE');
          expect(err1.message).equals('Expected type number but found type null');

          log(fault)
          log(fault.error.results)

          done();
        })
    })
  })


  describe('GET /api/v1/scores', () => {
    it('should repond with all available Scores', done => {
      request.get('/api/v1/scores')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.length).to.be.gte(0)
          log(res.body)
          done();
      });
    });

    it('should repond with the first Score', done => {
      request.get('/api/v1/scores?$top=1&$skip=0')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.length).equals(1);
          log(res.body)
          done();
      });
    });
  })

  describe('GET /api/v1/scores/:id', done => {

    it('should repond with the specified Score', done => {
      
      request.get('/api/v1/scores?$top=1&$skip=0')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          
          expect(res.body.length).equals(1);
          var expectedScore = res.body[0];
          expect(expectedScore._id).not.empty;

          request.get('/api/v1/scores/' + expectedScore._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              var actualScore = res.body;
              expect(actualScore).not.empty;
              expect(actualScore._id).to.equal(expectedScore._id);
              expect(actualScore.player).to.equal(expectedScore.player);
              expect(actualScore.points).to.equal(expectedScore.points);
              log(actualScore);
              done();
          });
      });
    });
  })

  describe('PUT /api/v1/scores/:id', done => {
    it('should update the first Score', done => {

      request.get('/api/v1/scores?$top=1&$skip=0')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          
          expect(res.body.length).equals(1);
          var originalScore = res.body[0];
          var newScorePoints = faker.random.number({ min: 0, max: 10000 });
          var newScore = Object.assign(originalScore, { points: newScorePoints })
          log ('newScorePoints', newScorePoints);
          request.put('/api/v1/scores/' + originalScore._id)
            .expect('Content-Type', /json/)
            .expect(204)
            .send(newScore)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.body).is.empty;
             
              request.get('/api/v1/scores/' + originalScore._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                  if (err) {
                    done(err);
                  }
                  var actualScore = res.body;
                  expect(actualScore).not.empty;
                  expect(actualScore._id).to.equal(originalScore._id);
                  expect(actualScore.player).to.equal(originalScore.player);
                  expect(actualScore.points).to.equal(newScorePoints);
                  log(actualScore);
                  done();
              });
          });
      });
    })
  })

  describe('DELETE /api/v1/scores/:id', done => {

    it('should delete the first Score', done => {

      request.get('/api/v1/scores?$top=1&$skip=0')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          
          expect(res.body.length).equals(1);
          var originalScore = res.body[0];
          
          request.delete('/api/v1/scores/' + originalScore._id)
            .expect('Content-Type', /json/)
            .expect(204)
            .end((err, res) => {
              if (err) {
                done(err);
              }
              expect(res.body).is.empty;
             
              request.get('/api/v1/scores/' + originalScore._id)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                  if (err) {
                    log(res.body)
                    return done(err);
                  }
                  done();
              });
          });
      });
    })
  })

});
