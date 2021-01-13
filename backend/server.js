const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/assign1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const app = express();
const port = 4444;

// Setting up middlewares
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/apiRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
