console.log("App");

const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use("/api/auth", authRouter);

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
  app.get("/", (req, res) => {
    res.send("Hi");
  });
}

start();
