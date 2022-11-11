const bcrypt = require('bcrypt');
const appDAO = require('../dataConnector/modelBusinessOwner');
// const db = new appDAO('database/businessOwner.db');
const db = new appDAO();
const jwt = require('jsonwebtoken');

exports.login = async (req,res,next) => {
       try {
           console.log("User: ", req.body.name);
           console.log("Email: ", req.body.email);
           db.viewBusinessOwner(req.body.name, req.body.email)
               .then((record) => {
                   var pass = record[0].password;
                   if (record.length==0) {
                       console.log("user ", req.body.name, " not found");
                       // return res.status(401).send();
                   }
                   bcrypt.compare(req.body.password, pass, function (err, result) {
                       if (result) {
                           res.locals.business = record[0];
                           next();
                       }
                       else {
                           return res.status(403).send();
                       }
                   });
               });  
       } 
       catch (error) {
            console.log(error.message);
       }
};

exports.createCookie = async (req,res,next) => {
    let payload = { OwnerName: req.body.name };
    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("jwt", accessToken);
    next();
};

exports.verify = function (req,res,next) {
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