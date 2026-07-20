const express = require('express');
const blogsRouter = require('./blogs/blogs.router');
const userRouter = require('./users/user.router');
const app = express() 
app.use(express.json());


app.use('/blogs' , blogsRouter) 
app.use('/users' , userRouter)


app.listen(3000, () => {
  console.log("server running on http://localhost:3000/");
});