//it represents table in the database
//agr yaha menu naam se bna rhe hai to database ke andar iske plural naam ka table hot ahai
//jese waha pe menus naam se a=hai grocery me

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//if 1st letter is capital then the thing iside it will be a class or a constructor function

const menuSchema = new Schema({
  //database ke andar jo collection hai wo kese dikhna chahiye
  //ye is table ke ander hoga

  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
});

module.exports = mongoose.model("Menu", menuSchema);
//hum is schema se model banayenge jiksa naam menu hoga (first letter capital rakhna hai)
//ab isme menuschema se model ban jayega...mongo me menus ke naam se banega ye
