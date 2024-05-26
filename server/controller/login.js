import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../model/user.js";

const login = async(req, res)=>{
    try{
        const{ email, password} = req.body;
        
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser){

            const isMatch = await bcrypt.compare(password, existingUser.password);
            console.log(isMatch);

            if(isMatch){
                const token = jwt.sign( { id: existingUser._id}, process.env.JWT_SECRET);
                const user = {userId: existingUser._id, firstName: existingUser.firstName, lastName: existingUser.lastName, email: existingUser.email, phoneNumber: existingUser.phoneNumber}
                console.log("complete");
                res.status(200).json({token: token, user: user, message: "Logged in Successfully."})
            }
            else{
                console.log("fails")
                res.status(401).json({message: "Invalid Credentials."})
            }
        }
        else{
            console.log("checking");
            res.status(400).json({message: "User does not exist."});
        }
        
    } catch(err){
        res.status(500);
    }
}
export default login;