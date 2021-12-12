 //cart.ejs me orders order now waale button se pehle ek form banaya tha jisme humne form action me /orders daala tha
 //jaha pe wo tha wha pe ordercontrollers ka store waala rturn object kaam krra tha 

//EK HUMNE ORDER KE LIYE ORDERS SCHEMA BANAYA HAI..TAAKI MONGO ME STORE KRPAAYE
//AB USKO IMPORT KRNEGE

const Order = require("../../../models/order")
const moment=require('moment');

function orderController() {



    return {
  store(req,res) {

    //validate request
    const {phone, address} = req.body
    //humne cart.ejs me phone aur address me name daal dia tha..usiname se uhme yha pe receive hora hai phone aur address

    //aur ye address aur phone hume req ki body se milta hai

    if(!phone || !address) {
//agr phone aur address ni daale to us care me error show krenge
   req.flash('error', 'All fields are required')
   return res.redirect('/cart')

}



//agr phone aur addreess daaala hai to usko store krna hai hume nya orer bna ke
  
const order = new Order({
    customerId: req.user._id,
    //passportjs hume req.user se logged in user available krdeta hai
    items: req.session.cart.items,
    //cart banaya tha items naam ka obj tha usko hum yha daal denge
    phone: phone,
    address: address,


})

//ab hume order ko save krna hai

order.save().then(result => {
req.flash('success','Order placed successfully!')
//then ke andar hume jo oredr save hua hai wahi mil jayega

delete req.session.cart

//order place hogya ab cart ke items ko delete bhi krna hai..isme
//js me koi bhi session ki property ko delete krne ke liye delete keyword use hota hai


return  res.redirect('/customer/orders')
//ab humara jese hi order place hota hai usko hum naye page pe transfer krdenge
//jispe saare orders ka combination hai

}).catch(err => {
    req.flash('error','Something went wrong!')
    return res.redirect('/cart')
})



    console.log(req.body)
  },

  async index(req,res) {
      const orders = await Order.find({ customerId: req.user._id },
        null,
        {sort: { 'createdAt': -1 }})
      //req.user.id se logged in user mil rha hai 
      //customerid us user ki id hai jisne order maara hai aur us id ko hum database me user ki ids se match krenge
      //isse hum us customer ke saare orders le paayenge
      
      //sort -1 mtlb ki hume decending order me laarhe hai orders ko...yha pe createdAt time hai jab wo book kia hai humne kuch

      res.render('customers/orders',{orders: orders, moment: moment})
// yha pe orders hum front end pe bhej rhe hai to in orders ko hum orders.ejs me use krskte hai

      //views.ejs ko humne server .js me set krrakha hai...to directly hum yha pe
    // views ke ander ki files ka use kr skte hai
     // console.log(orders)
  }

    }
}

module.exports = orderController ;