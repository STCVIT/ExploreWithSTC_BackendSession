const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URL ,
    {
      useNewUrlParser: true, // we do this to avoid the depracation warning
      useUnifiedTopology: true, //The useUnifiedTopology option removes support for several connection options that are no longer relevant with the new engine:
      useCreateIndex: true, // we do this to avoid the depracation warning which comes up if we define indexes
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });

const userrouter = require("./routes/user");
const todorouter = require("./routes/todo");
app.use(userrouter);
app.use(todorouter);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
