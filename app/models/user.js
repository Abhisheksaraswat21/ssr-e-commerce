//it represents table in the database
//agr yaha menu naam se bna rhe hai to database ke andar iske plural naam ka table hot ahai
//jese waha pe menus naam se a=hai grocery me

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//if 1st letter is capital then the thing iside it will be a class or a constructor function

const userSchema = new Schema(
  {
    //database ke andar jo collection hai wo kese dikhna chahiye
    //ye is table ke ander hoga

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    //unique is true,, it means ki agr same email se koi do baar account banayega to fir usko
    //error aayega
    password: { type: String, required: true },

    role: { type: String, default: "customer" },
    //role mtllb admin hai ya customer hai
    //default mtlb agr hume ye info koi na de to hume by default usko customer bol de
  },
  { timestamps: true }
);
//timstamp se pta chalega konsa suer kab register hua, creetaed at ye sb

module.exports = mongoose.model("User", userSchema);
//hum is schema se model banayenge jiksa naam User hoga (first letter capital rakhna hai)
//ab isme menuschema se model ban jayega...mongo me Users ke naam se banega ye

//ab is user ko export krdia maine and then i used it in authcontroller
