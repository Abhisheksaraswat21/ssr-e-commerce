import axios from "axios";

import Noty from "noty";

import { initAdmin } from './admin'

let addToCart = document.querySelectorAll(".add-to-cart");
//here in home.ejs we have this class for + button, we want to store this for all the itmes on homepage

//saare buttonss as aray addtocart me aajayenge

let cartCounter = document.querySelector("#cartCounter");

function updateCart(grocery) {
  //ab hum axios use krenge
  //isme hum jis grocery pe + hua hai us ko cart pe add krenge and show that on the server

  axios
    .post("/update-cart", grocery)
    .then((res) => {
      //update-cart ka declaration routes ke ander web.js me maara
      console.log(res);
      //data send krna hai to post request, data send krna hai hume each grocery , to grocery likha
      //agr successful hua to .then sur isme response receive hoga
      //sucessful hone pe .then ke res me grocery item hi aayega

      cartCounter.innerText = res.data.totalQty;
      //cartcounter humne ek id banai hai layout.ejs me wo bhai cart ke ici=on ke upar
      //ab usko yha leke mai uske inntertext pe total quaantity ka number daal rha hu response se

      // noty ka use hum notificaiton dikhaan ke liye krrhe hai
      // //isko yarn add noty@3.2.0 kia tha
      new Noty({
        type: "success",

        timeout: 1000, //1 sec ke baad gayab hojayega
        // progressBar: false, //agr hume progress baar notificaiton ke neeche ni chahiye to

        layout: "bottomLeft", //ab bottomleft me aayega
        text: "Item added to cart!",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error", //isse red colour me aayega

        timeout: 1000, //1 sec ke baad gayab hojayega
        // progressBar: false, //agr hume progress baar notificaiton ke neeche ni chahiye to

        layout: "bottomLeft", //ab bottomleft me aayega
        text: "Something went wrong",
      }).show();
      //agr error aaya to  catch wala chalega
    });
}
addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // let grocery = btn.dataset.grocery;
    // //grocery is json string that we converted in the home.ejs, we receieved that  here
    // console.log(grocery);

    let grocery = JSON.parse(btn.dataset.grocery);
    //it will covert the stringified json file to normal file

    updateCart(grocery);
    //grocery paas hui hai isme
  });
});

//this file automatically compiles and goes to public folder due to laravwl


//Remove alert message after x seconds

const alertMsg = document.querySelector('#success-alert')
//oredrs.ejs me success-alert ek id hai jo success message print krti hai
if(alertMsg)
{
  setTimeout(()=>{
alertMsg.remove
  },2000)
  //mltb 2 second ke baad krdo remove
}

initAdmin()
//admin.js ke andar ka code yha pe include hojaygea