module.exports = function(req,res,next){
    if(!req.user.isAdmin){
        res.status(403).send('Access Denied');
        return;
    }
    next();
}


//404 not found
//401 Unauthorized
//403 Forbidden