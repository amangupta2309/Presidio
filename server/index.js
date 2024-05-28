import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authroutes from './routes/auth.js';
import User from "./model/user.js";
import {verifyToken} from './middleware/auth.js';
import { createNewPost } from "./controller/createNewPost.js";
import { getUserPosts } from "./controller/getUserPosts.js";
import { updatePost } from "./controller/updatePost.js";
import { getAllPosts } from "./controller/getAllPosts.js";
import { likePost } from "./controller/likePost.js";

//Configuration 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));



app.get("/", (req, res)=>{
    res.json("server is running");
});

app.post("/createPost", createNewPost);
app.post("/getUserPosts", getUserPosts);
app.post("/updatePost", updatePost);
app.get("/getAllPosts", getAllPosts);
app.patch("/like", likePost);

app.use("/auth", authroutes);


// Server Setup
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`)); 