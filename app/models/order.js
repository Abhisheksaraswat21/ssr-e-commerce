//it represents table in the database
//agr yaha menu naam se bna rhe hai to database ke andar iske plural naam ka table hot ahai
//jese waha pe menus naam se a=hai grocery me

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//if 1st letter is capital then the thing iside it will be a class or a constructor function

const orderSchema = new Schema(
  {
    //database ke andar jo collection hai wo kese dikhna chahiye
    //ye is table ke ander hoga
customerId : { 
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    //hume user ke saath isko refrence dena hai
    required: true
},
   items : { type: Object, required: true },
//isme hum session ke cart me se items store krenge

 phone: {type: String, rquired: true},
 address: {type: String, required: true},
paymentType: {type: String , default: 'COD'},

//cod hai ya online hai bank tranfer hai
//by default cod lerhe hai

status: {type: String , default: 'order_placed'},



//hume ese id store ni krni...hume user collection ke saath jo refrence hai wo bhi store krna hai to uske liye hume mongoose
//user krke krenge

  },
  { timestamps: true }
);
//timstamp se pta chalega konsa suer kab register hua, creetaed at ye sb

module.exports = mongoose.model("Order", orderSchema);
//hum is schema se model banayenge jiksa naam User hoga (first letter capital rakhna hai)
//ab isme menuschema se model ban jayega...mongo me Users ke naam se banega ye

//ab is user ko export krdia maine and then i used it in authcontroller
