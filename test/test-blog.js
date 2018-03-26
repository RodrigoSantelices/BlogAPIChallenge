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

  it('should list items on GET', function(){
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
    });
  });


  it('should create single post on POST', function(){
    const newPost = {
      title :'this here',
      content: 'morehere',
      author: 'last here'
    };
    const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newPost));

    return chai.request(app)
    .post('/blog-posts')
    .send(newPost)
    .then(function(res){
      expect(res).to.have.status(201);
      expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.all.keys(expectedKeys);
        expect(res.body.title).to.equal(newPost.title);
        expect(res.body.content).to.equal(newPost.content);
        expect(res.body.author).to.equal(newPost.author)
    })
  });

  it('should delete single post on DELETE', function(){
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res){
      return chai.request(app)
        .delete(`/blog-posts/${res.body[0].id}`)
        .then(function(res){
          expect(res).to.have.status(204);
        })
    })
  });

  it('should update single post on PUT', function(){
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res){
      const updatedPost = Object.assign(res.body[0],{
        title:'something here',
        content: 'more here'
      });
      return chai.request(app)
        .put(`/blog-posts/${res.body[0].id}`)
        .send(updatedPost)
        .then(function(res){
          expect(res).to.have.status(204)
        });
    })
  });

})
