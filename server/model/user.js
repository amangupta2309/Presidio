import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            max:50  
        },
        lastName:{
            type: String,
            required: false,
            max: 50
        },
        email:{
            type: String,
            required: true,
            max:50  
        },
        password:{
            type: String,
            required: true,
        },
        phoneNumber:{
            type: String,
            required: true,
            max: 20
        }
    },
    {timestamps: true},
);

const User = mongoose.model("User", userSchema);
export default User;