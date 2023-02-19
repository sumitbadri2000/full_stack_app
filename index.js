const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { UserRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/node.routes");
const { authenticate } = require("./middleware/auth.middle");
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/users", UserRouter);
app.use(authenticate);
app.use("/notes", noteRouter);
app.listen(8090, async () => {
  try {
    await connection;
    console.log("server");
  } catch (error) {
    console.log(error);
  }
  console.log("connect");
});
