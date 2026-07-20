const { Router } = require("express");
const fs = require('fs/promises')
const userRouter = new Router()

app.get("/", async (req, res) => {
  
    const users = await fs.readFile('users.json' , 'utf-8')
    const parsedUsers = JSON.parse(users) 
    res.json(parsedUsers)
}); 

app.post('/' , async(req,res)=> {
    if(!req.body.name || !req.body.age) {
      return  res.status(400).json({
            message:"bad request name and age are required"
        })
    }
     const users = await fs.readFile('users.json' , 'utf-8')
    const parsedUsers = JSON.parse(users) 
    const lastId = parsedUsers.length
    const newUser = {
        name:req.body.name ,
        age:req.body.age , 
        id: lastId+1
    }
    parsedUsers.push(newUser) 
    await fs.writeFile('users.json' , JSON.stringify(parsedUsers))
    return res.status(201).json({message:"created user succesfully"})
})
app.put("/:id", async (req, res) => {
  const users = await fs.readFile("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);

  const userIndex = parsedUsers.findIndex(
    (u) => u.id === Number(req.params.id),
  );

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!req.body.name || !req.body.age) {
    return res.status(400).json({
      message: "Bad request. Name and age are required.",
    });
  }

  parsedUsers[userIndex] = {
    ...parsedUsers[userIndex],
    ...req.body,
  };

  await fs.writeFile("users.json", JSON.stringify(parsedUsers, null, 2));

  return res.status(200).json({
    message: "Updated successfully",
  });
});


module.exports = userRouter;