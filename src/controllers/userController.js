const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res)=> {

 // User existing :
        const {username, email, password} = req.body;
          try {
            const existingUser = await userModel.findOne({email: email})
            if(existingUser){
                 return res.status(400).json({message: "User Already Exists"});
            }

 // Hashed Password : 
        const hashedPassword = await bcrypt.hash(password, 10);

 // User Creation :
        const result = await userModel.create({
            email : email,
            password : hashedPassword,
            username : username
        }); 

 // Token Generation ;
        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
        res.status(201).json({useer: result, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something Went Wrong"});
    }
}



const signin = async (req, res)=> {
    
   // User Existing
         const {email, password} = req.body;
            try {
                const existingUser = await userModel.findOne({email: email});
                if (!existingUser){
                  return res.status(404).json({message: "User Not Found"});
                }

   // Match Credentials
         const matchPassword = await bcrypt.compare(password, existingUser.password);
         if(!matchPassword){
           return res.status(400).json({message: "Invalid Credentials"});
         }

   // Login User
         const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);
         res.status(200).json({user: existingUser, token: token});
            } catch (error) {
                console.log(error);
                res.status(500).json({message: "Something Went Wrong"});
            } 
}

module.exports = {signup, signin}