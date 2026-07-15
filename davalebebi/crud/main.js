const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs/promises");

app.get("/users", async (req, res) => {
  const users = await fs.readFile("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  res.json(parsedUsers);
});

app.post("/users", async (req, res) => {
  const users = await fs.readFile("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  if (!req.body.name || !req.body.age || !req.body.isSmoker) {
    return res.status(401).json({
      message: "name age or isSmoker is required",
    });
  }

  const lastId = parsedUsers.length;
  const newUser = {
    name: req.body.name,
    age: req.body.age,
    isSmoker: req.body.isSmoker,
    id: lastId + 1,
  };
  parsedUsers.push(newUser);
  await fs.writeFile("users.json", JSON.stringify(parsedUsers));
  return res.status(201).json({
    success: true,
    message: "succesfully created user",
  });
});
app.put("/users/:id", async (req, res) => {
  const users = await fs.readFile("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);

  const user = parsedUsers.find((user) => user.id === Number(req.params.id));
  user.name = req.body.name;
  user.age = req.body.age;
  user.isSmoker = req.body.isSmoker;
  await fs.writeFile("users.json", JSON.stringify(parsedUsers));
  return res.status(201).json({
    message: "updated succesfuilly",
  });
});

app.delete("/users/:id", async (req, res) => {
  const users = await fs.readFile("users.json", "utf-8");
  const parsedUsers = JSON.parse(users);
  const updatedUsers = parsedUsers.filter(
    (user) => user.id !== Number(req.params.id),
  );
  await fs.writeFile("users.json", JSON.stringify(updatedUsers));
  return res.status(200).json({
    message: " deleted succesfully",
  });
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000/");
});
