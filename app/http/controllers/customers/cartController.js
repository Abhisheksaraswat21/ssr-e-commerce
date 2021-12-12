function cartController() {
  return {
    //humnee receive krlia hai req,res ko

    index(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      //ab cart ka logic yaha likhna hai

      //for the first time creating cart and adding basic object structure

      if (!req.session.cart) {
        // mtlb ki agr req ke session me cart naam ki key ni hai to koi item add ni hua
        //mtlb ki pehli baar cart banega

        req.session.cart = {
          // cart propery ni hai to hum bna lennge ab
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
        // agr session ke andar cart ni hai to ye wala structure follow hoga
      }
      let cart = req.session.cart;
      //jo bhi cart obj jo humne sessio me banaya tha wo ab hum cart me paaas krdenge usko
      //agr koi item hai req me to cart se access hojayega

      //check if item already exist in cart

      // console.log(req.body)

      if (!cart.items[req.body._id]) {
        //req ke andar (mtlb ki jo grocery hume button click krne pe mili uska kuch chahiye hota
        //hai to hum req.body._id se krte hai)
        //mtlb agr cart me items me grocery naam se key hai jisme hum grocery ki id rakhenge
        //agr wo item exit ni krra to ab hum wo item crreate krenge jisme item me ek saaman ki poori detail hogi
        //and kyuki first time koi samaan add hoga to use qty 1 hogi

        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };

        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
        //cart ka jo pichla price hai usme ek samaan ka price add krdia
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        //agr pehle se hai to usme humne ek add krdia hia bs
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      // agr higa to us item ki quantuty bhada denge...agr nni hoga to uso itms me add krenge

      return res.json({ totalQty: req.session.cart.totalQty });
      //koi item cart me add hoga  to usko hum bhej rhe hai
    },
  };
}

module.exports = cartController;
