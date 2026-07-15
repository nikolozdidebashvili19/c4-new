const express = require("express");
const fs = require("fs/promises");
const app = express();

app.get("/users", async (req, res) => {
  const users = await fs.readFile("users.json", "utf8");
  const parsedUsers = JSON.parse(users);
  res.json(parsedUsers);
});
app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = await fs.readFile("users.json", "utf8");
  const parsedUsers = JSON.parse(users);
  const existUser = parsedUsers.find((u) => u.id === id);
  if (!existUser) {
    res.status(404).json({
      success: false,
      message: "USER NOT FOUND",
    });
  }
  res.send(existUser);
});
app.post("/users", async (req, res) => {
  if (!req.body.fullName || !req.body.age || !req.body.isSmoker) {
    return res.status(400).json({
      success: false,
      message: "fullName age and isSmoker is required",
    });
  }
  const users = await fs.readFile("users.json", "utf8");
  const parsedUsers = JSON.parse(users);
  const lastId = parsedUsers[parsedUsers.length - 1]?.id;
  const newUser = {
    id: lastId + 1,
    fullName: req.body.fullName,
    age: req.body.age,
    isSmoker: req.body.isSmoker,
  };
  parsedUsers.push(newUser);
  fs.writeFile("users.json", JSON.stringify(parsedUsers));
  res.status(201).json({
    message: "created succesfully",
  });
});
app.delete("/users/:id", async (req, res) => {
  const users = await fs.readFile("users.json", "utf8");
  const parsedUsers = JSON.parse(users);
  res.json(parsedUsers);
  const index = parsedUsers.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  parsedUsers.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000/");
});
