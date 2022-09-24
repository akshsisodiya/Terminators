const express = require("express");
const connectDB = require("./config/db_config");
const morgan = require("morgan");
const { create } = require("express-handlebars");
var bodyParser = require('body-parser')

const path = require("path");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { ensureAuth } = require("./middleware/auth");
const { Double } = require("mongodb");
require("dotenv/config");
// config
const app = express();
var jsonParser = bodyParser.json()
app.use(jsonParser)

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)


const hbs = create({
  helpers: {
    divideByHundred: (param) => {
      return parseInt(param.data.root.paymentDetail.amount) / 100;
    },
    jsonStringify: (param) => {
      return JSON.stringify(param.data.root.paymentDetail.orderId);
    },
  },
  extname: "hbs",
  defaultLayout: false,
});

// passport config
require("./config/passport")(passport);

// development console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// session middleware
app.use(
  session({
    secret: "Terminators",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION,
    }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/api", ensureAuth, require("./routes/api"));
app.use("/test-aksh-api", require("./routes/api"));
app.use("/payment",urlencodedParser , require("./routes/payment"));

app.get('/arduino',(req,res)=>{
  res.status(200).send("done")
})
// connect to db
connectDB();

// run server
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Running in ${process.env.NODE_ENV} on port ${port}`)
);
