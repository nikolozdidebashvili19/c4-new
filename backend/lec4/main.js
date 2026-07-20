const express = require("express");
const fs = require("fs/promises");
const userRouter = require("./users/users.route");
const blogsRouter = require("./blogs/blogs.router");
const app = express();
app.use(express.json());

app.use('/users' , userRouter )
app.use('/blogs' , blogsRouter)


app.listen(3000, () => {
  console.log("server running on http://localhost:3000/");
});
