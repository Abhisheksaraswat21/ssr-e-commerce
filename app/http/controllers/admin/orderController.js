//ye order controller admin ke liye hai

const Order = require("../../../models/order");
const order = require("../../../models/order")
function orderController() {



    return {

        index(req,res) {

   order.find({status: { $ne: 'completed'}}, null, {sort: { 'createdAt': -1}}).
   populate('customerId', '-password').exec((err,orders)=> {
//populate se hume customerid ni milegi balki customer ka document mil jayga..mtlb us id se related data users wale database se aajayega including password
//hume password ni chahiye
//exec command is ued to run
//uhme orders receive hore hai yha pe

if(req.xhr){
    return res.json(orders)
    //check krre hai ki request agr ajax hai to json me bhej rhe hai
    //ajax call maari hai admin.js wali file se
}
else
{

//agr koi user direct url se is page pe jayega to him ni dikhayenge...to us case me ye niche wala page jayega
res.render('admin/orders');
}

        })
    }
}
}
module.exports = orderController ;