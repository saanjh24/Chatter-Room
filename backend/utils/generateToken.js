import jwt from "jsonwebtoken";

const generateTokenAndSetCookie =(userId,res)=>{
  const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn : '45d'
  })

  res.cookie("jwt",token,{
    maxAge: 45 * 24 * 60 * 60 * 1000,
    httpOnly :true,//prevent cross site scripting attack
    sameSite :"strict",
    secure : process.env.NODE_ENV !== "development"
  })
}


export default generateTokenAndSetCookie;