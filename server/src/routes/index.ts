import { Router } from "express";

import urlRouter from "./urlRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";

const router = Router();


router.use("/url", urlRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
