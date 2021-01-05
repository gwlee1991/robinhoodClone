const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./configs');

require('./models/User');
require('./models/Transaction');

mongoose.connect(keys.MONGO_URI, { useUnifiedTopology: false });

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

require('./routes/UserRoutes')(app);
require('./routes/DataRoute')(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = app;