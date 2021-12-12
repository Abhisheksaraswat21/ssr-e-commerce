require("dotenv").config();
//module env ko imprt kai aur method ko call kia
//by this calling we can access all the vairiables in env
const express = require("express");

const app = express();
//app naam ke object me saare functionalities hai jo express me hai

const ejs = require("ejs");

const path = require("path");

const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3300;
//environment me port naam ka variable hai to use use krenge wrna hum 300 pe run krnege

const mongoose = require("mongoose");

const session = require("express-session");

const flash = require("express-flash");

const MongoDbStore = require("connect-mongo")(session);
//ab humare sessions ko database me store krne ke liye hum connect mongo ka use krenege
//() mtlb run krdia k=yahi pe adn session paas krdia


const passport = require("passport");
//authentication ke liye isko import kia hai


//Database Connection

const url = "mongodb://localhost:27017/grocery";
//databse pizza ke naam se tha to grocery likh dia

mongoose.connect(url, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  //useUnifiedTopology: true,
  // useFindAndModify: true,
});

const connection = mongoose.connection;

connection
  .once("open", () => {
    //agr data conneciton hojaata hai to event listner open call hoga
    // aur connected aayega
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("connection failed...");
  });
//error ko catch kia hai






//session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  //jis database me store krna hai uska connection dena hai

  collection: "sessions",
  //databse ke ander session naam ka table ya collection banega jisme sotre honge sessions
});

//sessions config

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    //this will acces the value of cookis_secret in the env file

    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    //humne baaya ki session kaha store krne hai and we defined mongostore upar
   
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour

    //w have defined the file of cookie, it is taken in millisec
    //here we have made it equal to 24 hrs
  })
);


//PASSPORT KA CONFIG SESSIONS KE CONFIG KE BAAD HI HOGA

//Passport Config

const passportInit = require('./app/config/passport')

passportInit(passport);
//passport upar declare kia wo hume yaha passportinit me chahiye
//to pass krdia


app.use(passport.initialize())
app.use(passport.session())





// it works as a midle waare
//for middlewares we use app.use

app.use(flash());

//Assets

app.use(express.static("public"));
//isme humne ye bta dia ki static folder konsa hai..iisse ab css file css ke tarike se dikhegi

app.use(express.json());
//for viewing json files on console

//for seeing the url encoded data ...jb register pe sign in maara to uska data console
//pe ni dikha, kuyuki url encoded hai..isse dikhega

app.use(express.urlencoded({ extended: false }));

//GLobal Middlesware
// ususally huamre sessions front end me nahi available hote
// to uske liye hume global middlewware ka use krte hai

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
  //   agr sab kuch sahi hua to next function call hotahai isme
  // agr nwxt function ko ni daala to refrsh krne pe page ghumta hi rahega
  // aage ni chalega
});
//now session key will be available in layout.ejs
//now users can be used in front end in layout.ejs


//set template engine

app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
//isse ye pta chl jayega ki views kha pe hai

app.set("view engine", "ejs");

require("./routes/web")(app);
//path bataya humne rot=utes file kka aur usme app paas krdi
//ab () brackets ka mtb hai ki jo kuch bhi wha initroutes me jhoga wo run krega

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
