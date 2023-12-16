const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("the token is here", token);
    const user = jwt.verify(token, "secretkey"); //decrypting the token here by verify
    console.log("userID >>>> ", user.userId);
    User.findByPk(user.userId).then((user) => {
      req.user = user; ///the global object,the request body will contain the user id,the exact person who logged in
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
    // err
  }
};

module.exports = {
  authenticate,
};
