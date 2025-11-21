
const jwt = require("jsonwebtoken")

const isAuthenticated = async(req , res , next)=>{
  // console.log(req.headers);
  // Get header obj fromthe header
  const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
  // console.log(token);
  // Verify The token
    const verifyToken = jwt.verify(token, "masynctechKey", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
    // console.log(decoded)
  });
  if (verifyToken) {
    //!Save the user req obj
    req.user = verifyToken.id;
    next();
  }
  // console.log(verifyToken);
  else{
    const err = new Error("Token expired , login again");
    next(err);
  }

};

module.exports  = isAuthenticated;

