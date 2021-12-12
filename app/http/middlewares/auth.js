function auth(req,res,next) {

    if(req.isAuthenticated()) {
        //passport ki hekp se isauthenticated se hume ye pta chl jaata hai ki user logged in hai ya nahi

        return next()
        //agr user login hai to request ko procedd krna hai aage
    }

    res.redirect('/login')
    //agr login ni hai to login page pe wapas bhej dena hai
}


module.exports = auth