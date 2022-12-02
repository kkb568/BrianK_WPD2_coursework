const jwt = require('jsonwebtoken');

exports.createCookie1 = async (req,res,next) => {
    let payload = { name: req.body.name };
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("jwt", accessToken,{httpOnly:true, secure:true});
    next();
};

exports.verify1 = function (req,res,next) {
    let accessToken = req.cookies.jwt;
    if(!accessToken) {
        return res.status(403).send();
    }
    let payload;
    try {
        payload = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        res.status(401).send();
    }
};