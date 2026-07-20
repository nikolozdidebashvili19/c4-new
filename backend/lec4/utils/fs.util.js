const fs = require("fs/promises");

const readFile = async (filePath, isParse) => {
  const data = await fs.readFile(filePath, "utf-8");

  return isParse ? JSON.parse(data) : data;
};

const writeFile = async (filePath, data) => {
  data = typeof data !== "string" ? JSON.stringify(data) : data;
  await fs.writeFile(filePath, data);
  console.log("written successfully");
};

module.exports = {
  readFile,
  writeFile,
};
