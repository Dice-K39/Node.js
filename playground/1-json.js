const fs = require("fs");

const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

console.log(data)

data.name = "Dice";
data.age = 40;

const newData = JSON.stringify(data);
fs.writeFileSync("1-json.json", newData);