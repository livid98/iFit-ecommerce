
import { Registration, Login } from "../controllers/auth.controller.js";
import { Router } from "express";
import { RegistrationValidation } from "../middlewares/auth.middleware.js";
import { LoginValidation } from "../middlewares/auth.middleware.js";
import { deleteSession } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", RegistrationValidation, Registration);

router.post("/signin", LoginValidation, Login);

router.delete("/delete", deleteSession);

export default router;