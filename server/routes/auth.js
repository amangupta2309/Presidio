import express from 'express';
const router = express.Router();
import register from '../controller/register.js';
import login from '../controller/login.js';

router.post("/register", register);
router.post("/login", login);
router.get("/login", (req, res)=>{
    res.send({ title: 'GeeksforGeeks' });
})
router.get("/register", (req, res)=>{
    res.send({ title: 'GeeksforGeeks' });
})

export default router;