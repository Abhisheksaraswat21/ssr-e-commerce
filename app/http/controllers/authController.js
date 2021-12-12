const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../../models/user");
//user schmea jo humne banai thi wo yaha import kri maine


function authController() {
  return {
    //humnee receive krlia hai req,res ko

    login(req, res) {
      res.render("auth/login");
    },

    postLogin(req,res, next) {
//next is a callback that is received jiska mtlb hai ki ssbkuch theek hai to 
//request aage proceed hojayegi

const {email, password } = req.body;


//this is received from front end humne register.ejs me har input me name me ="name 
// "email" aur password daala hai to wo yha pe receove hojayega







      // validate request

      if (!email || !password) {
        req.flash("error", "All fields are required");
        //first is key and second is message

        //flash se message pop hoga , aur fals is used to pop message only once
        //baar baar ni hoga and thats what we want
        //error humne ek key di hai and uske baad is the value of that key...

      

        return res.redirect("/login");
        //agr inme se koi bhi ni hoga to ye redirect kkrdega registr ke page par
      }



passport.authenticate('local', (err, user, info) => {
//ye hume login ke liye krna pdta hai..local means humari stratery konsi hai
//err is error... user is the data of the user and info is the 'message' key jo passport.js se milti thi return done me
//ye bilkul done ki trh hai jo passport me tha

if(err)
{
  req.flash('error', info.message) 
  //info mtlb wo message wala object tha...to .message krdia mtlb wo message mil jayegaa
  return next(err);
}


if(!user)
{ //agr email match ni krra, ya password match ni krra ya koi aur error aati hai passport.js me
  //to humne user ki jagah false pass kia haai

  req.flash('error', info.message) 
  //info mtlb wo message wala object tha...to .message krdia mtlb wo message mil jayegaa
  
  return res.redirect('/login');
  //login page pe wapas bhej dia

}
//AGR USER KA EMAIL AUR PASSWORD SAHI HAI TO YE CHALEGA

req.logIn(user, (err)=> {

  //ye user hume passport se done ke andr pas krne pe mila hai

if(err) {

req.flash('error', info.message);
return next(err);

}

return res.redirect('/');

})


})(req,res, next)
//ye passport ek function return krta hai..jisko call krna pdta hai

    },

    register(req, res) {
      res.render("auth/register");
    },

    async postRegister(req, res) {
      //we will get name email and password here, and we will get it from req.body
      const { name, email, password } = req.body;


//this is received from front end humne register.ejs me har input me name me ="name 
// "email" aur password daala hai to wo yha pe receove hojayega







      // validate request

      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        //first is key and second is message

        //flash se message pop hoga , aur fals is used to pop message only once
        //baar baar ni hoga and thats what we want
        //error humne ek key di hai and uske baad is the value of that key...

        req.flash("name", name);
        req.flash("email", email);
        //ab agr kisi ne password ni daala to esa ni hona chahiye ki username aur email bhi chla jaaye
        //to iske liye hum flash me name aur email bhi paas krre hai
        //ab usko register.ejs me input me value field me daalenge
        //jo value me hota hai wo dikhta hai box me

        return res.redirect("/register");
        //agr inme se koi bhi ni hoga to ye redirect kkrdega registr ke page par
      }

      // check if email exist
      // pehla email is email in the users database and second is the email received from request (upar liya hai wo)

      // User.exists({ email: email }, (err, result) => {
      //   if (result) {

      //     req.flash("error", "Email alerady taken!");

      //     req.flash("name", name);
      //     req.flash("email", email);

      //     return res.redirect("/register");
      //   }

      // Check if email exists
      User.find({ email: email }, (err, result) => {
        if (!result) {
          //agr result hai to mtlb li email exist kra hai... is case me user ko error dikhaana hai

          // if database ka email == req se aara hai jo email...
          // and arrow function me err, result always paas hoga




          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
          //agr inme se koi bhi ni hoga to ye redirect kkrdega registr ke page par
        }
      });






      //HAsh Password

      const hashedPassword = await bcrypt.hash(password, 10);
      //humne bcrypt install kia yha pe

      //create a user in  database

      const user = new User({
        name, //name: name, donn method same hi hai
        //name is key , right side name is taken from destructuring the req.body
        email, //email: email,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) => {
          //then ke andr jo user store hua hai wo aajata hai

          //Login





          return res.redirect("/"); //homepage pe bhej dia user bnaate hi
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          
          //user store hone me koi error aaya to ye chalega

          return res.redirect("/register");

          //agr inme se koi bhi ni hoga to ye redirect kkrdega registr ke page par
        });

     // console.log(req.body);
      //abhi ye yha pe console me braces dikha rha hai, mtlb ki express ko btana pdega ki
      //data url encoded hai to usko display kro
      //to server.js me  app.use(express.urlencoded({extended: false}))
    },
    logout(req,res) {
  req.logout()
  //it is very easy to logout with passport
  return res.redirect('/login');
    }
  };
}

module.exports = authController;
