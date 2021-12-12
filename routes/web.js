const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");
const guest = require("../app/http/middlewares/guest")
const orderController = require("../app/http/controllers/customers/orderController");
const auth = require('../app/http/middlewares/auth')

const AdminOrderController = require('../app/http/controllers/admin/orderController')

function initRoutes(app) {
  //yah pe humne app function pas kkia hai...is initroutess ko export krke humne wha se paas kia hai app function ko

  app.get("/", homeController().index);

  //seocnd funcion me req, res automatically paas hojaata hai

  //   app.get("/", (req, res) => {
  //     res.render("home");
  //     //views tk kaa path specified hai to ab hum uske baad ka path daalene
  //   });

  app.get("/cart", cartController().index);


  app.get("/login", guest ,authController().login);
//mtlb ki login page pe jaane ke liye user ka login ni hona chahaiye..humne guest me yahi bataya hai
//ab agr login hone ke baad user url me /login likhega to waha pe ni jaa payega

  app.post('/login', authController().postLogin);
//ab /login pe login request maarenge hum log...tabhi app.post lia hai

  app.get("/register", guest, authController().register);
  //mtlb ki REGISTER page pe jaane ke liye user ka login ni hona chahaiye..humne guest me yahi bataya hai
//ab agr register hone ke baad user url me /REGISTER likhega to waha pe ni jaa payega

  app.post("/register", authController().postRegister);
  //ab post req daalenge regoister page ke liye
  //jo url denge usme request jaygi, and we can keep same url asfunction are different
  //ab postregister me humari request jaygi jaha pe hum access krenge usko (authcontroller me)


  app.post("/logout", authController().logout);



  app.post("/update-cart", cartController().update);


//CUSTOMER ROUTES ---

app.post("/orders", auth,orderController().store);

app.get('/customer/orders',auth,orderController().index)
//is link pe hum ye dekhna chahte hai ki kis kisske kya order aaye hai

//auth mtlb agr user login hoga to hi order details ka page dikhega wrna ni dikhega



//Admin Routes
app.get('/admin/orders',auth,AdminOrderController().index)


}

module.exports = initRoutes;
