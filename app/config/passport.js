//iske andar passport ka cong=figuration krenge

const LocalStrategy = require('passport-local').Strategy
//stratery means kisse login krra hu....email password se krne pe local bolte hao usko
//class ya constructor store hota hai to ye LocalStratery ek naming convention hai..isko call krte hai new keyword krke
const User = require("../models/user");

const bcrypt = require('bcrypt');

function init (passport) {

    passport.use(new LocalStrategy({ usernameField: 'email'}, async(email, password, done)=> {
// passport is trh se use hota hai... usernameField me hum daalte hai wo object jo humari username kaa
// kaam krta hai ....fir ek arrow function me hume email, password milta hi hai jo hum login ke liye use krte hai
// and ek done naam ka hum callback derhe hai

//check if email exist

const user = await User.findOne({email: email})
//hume ek user dhoondna hai ....
//database ka email yha pjo paas hua hai us email ke equal hona chahiye
//agr email same hua to 'user' variable mil jayega hume


if(!user)
{
    return done(null, false, {message: 'No user with this email'})
//agr user ka email data base ke kisi email se match ni hua...to hum message dedenge
//jaha false likha hai waha wo user aata hai jisse email match krta hai...yha ni kra to false aya
}

bcrypt.compare(password, user.password).then(match => {
//password compare krre hai yha pe...pehla password upar passport.use ke arrow function me aagya,
//dusra hum user.password..mtlb database ke user jiska email same hai
//password match hone pe .then me match milega jo ki true aur false hoga


    if(match) {
        return done(null, user, { message: 'Logged in successfully'})
    }
//match tells true or false...agr true hogya to user milega yaha pe and message aayega logged in

return done(null, false, { message: 'Wrong username or password'})


}).catch(err => {
    return done(null, false, { message: 'Something went wrong '})

})

//login ka logic
   
    }))



    
  //login hone ke baad hume session se kuch store krna pdta hai to know ki kona
  //user logged in hai...to serialiseuser use hota hai


    passport.serializeUser((user, done) => 
//isme hume user milta hai upar waale return done ki wjh se(jab match true tha tb)
//second parameter hume done milta hai yha pe
{
done(null,user._id)
//iska mtlb hai ki hum user ki id store krna chahte hai yha pe jo databse me hai
//hum email bhi store krskte hai
    })

passport.deserializeUser((id, done) => {
    //deserialize mtlb ki jo upar serialise se sesion me store kia hai usko get krna hai
//waha id store ki thi to yha pe id store hogai hai

User.findById(id, (err, user)=> {
    done(err, user)
})


})}





// isko serever ke andar import krenege to isko yha pe export krna hoga

module.exports = init