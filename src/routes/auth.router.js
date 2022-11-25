
import { Registration, Login} from "../controllers/auth.cotroller.js";
import {Router} from "express";
import { RegistrationValidation} from "../middlewares/auth.middleware.js";
import {LoginValidation} from "../middlewares/auth.middleware.js";

const router = Router();

 router.post("/signup", RegistrationValidation, Registration);

 router.post("/signin", LoginValidation, Login);

 export default router;