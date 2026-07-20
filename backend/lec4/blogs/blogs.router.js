const { Router } = require("express");
const blogsRouter = new Router()
const fs = require("fs/promises");
const checkBlogsPost = require("../middlewares/check-blogs-post");

blogsRouter.get('/' , checkBlogsPost, async(req,res)=> {
    const blogs = await fs.readFile('blogs.json' , 'utf-8')
    const parsedBlogs = JSON.parse(blogs)
    res.json(parsedBlogs) 
   
})

blogsRouter.post("/", async (req, res) => {
  const userId = req.headers["user-id"];
  if (!userId) {
    return res.status(401).json({
      message: "userId is required",
    });
  }
  const users = await fs.readFile("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  const user = parsedUsers.find((u) => u.id === Number(userId));
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!req.body.title || !req.body.desc) {
    return res.status(400).json({
      message: "title and description are required",
    });
  }
  const blogs = await fs.readFile("blogs.json", "utf-8");
  const parsedBlogs = JSON.parse(blogs);
  const lastId = parsedBlogs.length;
  const newBlog = {
    id: lastId + 1,
    title: req.body.title,
    desc: req.body.desc,
    author: user,
  };
  parsedBlogs.push(newBlog);
  await fs.writeFile("blogs.json", JSON.stringify(parsedBlogs));
  return res.status(201).json({
    success: true,
    message: "blog created successfully",
  });
});

module.exports = blogsRouter