import bcrypt from "bcrypt";
import User from "../model/user.js";

const register = async(req, res)=>{
    console.log("testing");
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            phoneNumber
        })
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if(existingUser){
            res.status(400).json({message: "Email already in use."})
        }
        else{
            const savedUser = await newUser.save();
            res.status(201).json({message: "User Registered Successfully."});
        }
        
    } catch(err){ 
        res.status(500).json({error: err.message});
    }
}
export default register;