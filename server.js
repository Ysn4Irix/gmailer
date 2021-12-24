require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const { connect } = require("mongoose");

const index = require("./routes/router");
const errors = require("./middlewares/errorHandlers");

const app = express();

app.use(logger("common"));
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/v1", index);

app.use(errors.notFound);
app.use(errors.errorHandler);

connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database Connected 🎉");
    const port = process.env.PORT || 6699;
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port} 🎉`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
