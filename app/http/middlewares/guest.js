function guest (req,res,next) {

if(!req.isAuthenticated()) {
    //ye passport ki help se mil rhi hai...isse check kr skte hai kki user logged in hai ya ni hai
//agr login ni hai to request ko aage process krna hai as it is guest middleware
    return next()
//request aage process krne ke liye next call kia

}

return res.redirect('/')
//agr login horakha hai to redirect krenge request ko homepage pe hi
}

//ISKA MTLB HAI  KI AGR USER LOGIN NI HORAKHA AUR /LOGIN URL ME DAALEGA..TO REQUEST AAGE JAYEGI AUR LOGIN PAGE KHULEGA
//AGR WO LOGIN HORAKHA HAI TO /LOGIN KRNE PE SEEDHE HOMEPAGE PE AAYEGA

module.exports = guest