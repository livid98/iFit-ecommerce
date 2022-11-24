
import { Registration, Login} from "../controllers/auth.cotroller.js";
import {Router} from "express";

const router = Router();

 router.post("/signup", Registration);

 router.post("/signin", Login);

 export default router;