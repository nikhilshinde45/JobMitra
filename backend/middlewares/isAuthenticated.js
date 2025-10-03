import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("REQ AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;
    // return  res.json({
    // //   status:200,
    // //   message:authHeader

    // //  });

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};
export default isAuthenticated;
// const jwt = require('jsonwebtoken');
// //require('dotenv').config();

// const checkAuthorization = (req,res,next)=>{
//   const token = req.headers.authorization;
//     if(token){
//       try{
//         const decoded = jwt.verify(token.replace('Bearer ','').process.env.SECRET);

//         req.id = decoded.id;
//         req.username = decoded.username;
//         req.privilege = decoded.privilege;
//         req.name = decoded.name;
//         next();
//       }catch(error){
//         res.json({
//           status:401,
//           message:'Unauthorized access denied'
//         });
//       }
//     }else{
//       res.json({
//         status:401,
//         message:'unauthorized access denied'
//       });
//     }

// }

// module.exports = {checkAuthorization};
