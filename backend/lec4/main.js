const express = require("express");
const fs = require("fs/promises");
const userRouter = require("./users/users.route");
const blogsRouter = require("./blogs/blogs.router");
const { log } = require("console");
const checkUserAgent = require("./middlewares/check-user-agent");
const app = express();
app.use(express.json());
app.use((req,res , next)=> {
  res.on('finish' , ()=> {
 console.log(req.method, req.url);
  })

 next()
 
})
app.use('/users' , userRouter )
app.use('/blogs' , checkUserAgent, blogsRouter)


app.listen(3000, () => {
  console.log("server running on http://localhost:3000/");
});
