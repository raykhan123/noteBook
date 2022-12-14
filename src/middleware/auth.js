const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "Notebook",function(err,token){
        if(err){ return res
          .status(401)
          .send({ status: false, msg: "TOKEN  IS NOT VALID" });}
          else{
            return token
          }
      }) 
      req.tokenId = decodedToken.userId;
      next();
    } catch (err) {
      return res.status(500).send({ Status: "SERVER ERROR", Msg: err.message });
    }
  };
  
  module.exports.authenticate = authenticate;