const Menu = require("../../models/menu");
//data fetch krna hai to meodel ki zroorat hogi

//factory functions are functions that create objects
//it returns an object

function homeController() {
  //this controller will control our homepage only
  //index is key here...good praactice to use it
  //agr just read krna hai to hum ese kr skte hai

  return {
    //humnee receive krlia hai req,res ko

    async index(req, res) {
      const groceries = await Menu.find();
      console.log(groceries);
      return res.render("home", { groceries: groceries });

      //isme hume saari groceries milengi groceries key me and wo key array of object ki trh kaam krengi
      //aur wo front end pe paas hongi aur hum use waha use karskte hai

      // Menu.find().then(function (groceries) {s
      //   console.log(groceries);
      //   return res.render("home", { groceries: groceries });

      //agr database se saara data chahiye to find method call krenge

      //function call hojaati hai jese hi data receive hota hai, aur groceries naam pe store hojayegaa

      //ye humne groceries ek key bna di jisme humne groceries paaas krdi hai, upar wali groceries is array of objects
    },
  };
}

module.exports = homeController;
