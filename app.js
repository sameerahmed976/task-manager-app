const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const tasks = require("./routes/tasks");
const { createDB } = require("./db/connectDB.js");
const notFound = require("./middleware/notFound.js");
const errorHandlerMiddleware = require("./middleware/errorHandler.js");
require("dotenv").config();

const DB_NAME_URL = process.env.MONGO_URI;

// const dbName = tasksdb;

app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1/tasks", tasks);

//meiddleware

app.use(notFound);
app.use(errorHandlerMiddleware);
// app.get("/", (req, res) => {
//   res.send("Hello me");
// });

createDB(DB_NAME_URL);
app.listen(port, () => {
  console.log(`The port on http://localhost:${port}`);
});
