const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')

const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();

BlogPosts.create('test title','book','rodrigo', '1990')
BlogPosts.create('The Hobbit','Book','Tolkien', '1937')

router.get('/',(req,res)=>{
  res.json(BlogPosts.get());
})

router.post('/', jsonParser, (req, res)=>{
const requiredFields = ['title', 'content', 'author']
for (let i=0; i<requiredFields.length; i++){
  const field = requiredFields[i];
  if(!(field in req.body)) {
    const message = `Missing\`${field}\`in request body `
    console.error(message);
    return res.status(400).send(message);
  }
}
const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
res.status(201).json(item);
});

router.delete('/:id', (req,res)=>{
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.id}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req,res)=>{
  const requiredFields = ['title', 'content', 'author']
  for (let i=0; i<requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing\`${field}\`in request body `
      console.error(message);
      return res.status(400).send(message);
}
}
  if(req.params.id !== req.body.id){
    const message = `Request path id (${req.params.id}) and request body (${req.body.id}) do not match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog posts \`${req.params.id}\``);
  BlogPosts.update({
    id:req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
})

module.exports = router;
