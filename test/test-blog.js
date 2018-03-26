const chai = require('chai');
const chaiHttp = require ('chai-http');

const {app, runServer, closeServer} = require('../server')

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Posts', function(){

  before(function(){
    return runServer();
  });

  after(function(){
    return closeServer();
  });

  it('should retrieve single post on GET', function(){
    return chai.request(app)
    .get('/')
    .then(function(res){
      expect(res.body.length).to.be.at.least(1);
    })
  });

  it('should create single post on POST', function(){
    return chai.request(app)
    .get('/')
    .then(function(res){
      expect(res).to.have.status(201)
    })
  });

  it('should delete single post on DELETE', function(){
    return chai.request(app)
    .get('/:id')
    .then(function(res){
      expect(res).to.have.status(204)
    })
  });

  it('should update single post on PUT', function(){
    return chai.request(app)
    .get('/:id')
    .then(function(res){
      expect(res).to.have.status(204)
    })
  });

})
