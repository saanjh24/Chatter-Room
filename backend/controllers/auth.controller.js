
import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const login= async (req,res) => {
    try{
        const {username , password}= req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare (password,user?.password || "");

   if(!user || !isPasswordCorrect){
    return res.status(400).json({error:"invalid username or password"});
   }

   generateTokenAndSetCookie(user._id,res);

   res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    username:newUser.username
   });

   


}


   catch(error){
         console.log("ERROR IN LOGIN CONTROLLER ",error.meassage);
         res.status(500).json({error: "INTERNAL SERVER ERROR"});
   } 
};

export const logout= async (req,res)=>{
    try{
      res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message :"Logged out successfully"});

    }catch(error){
        console.log("ERROR IN LOGOUT CONTROLLER ",error.meassage);
        res.status(500).json({error: "INTERNAL SERVER ERROR"});
    }
};


export const signup= async (req, res)=>{
    try{
        const {fullName, username,password,confirmPassword,gender}= req.body;
       if(password !== confirmPassword){
        return res.status(400).json({error : "PASSWORDS DON'T MATCH "})
}

const user = await User.findOne({username});

if(user){
    return res.status(400).json({error:"username already exists"});
}



//hash password here
const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password,salt);

const boyProfilePic ='https://avatar.iran.liara.run/public/boy?username=${username}'
const girlProfilePic ='https://avatar.iran.liara.run/public/girl?username=${username}'



const newUser =new User ({
   fullName,
   username,
   password:hashedPassword,
   gender,
   profilePic: gender=="male"? boyProfilePic : girlProfilePic


})

if(newUser){
    //generate jwt token here
 generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();

    res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        profilePic:newUser.profilePic
    });
}
else{
    res.status(400).json({error:"invalis user data"});
}




    }catch(error){}
};