import express from "express";
// import { getUser, getDashboardStats } from "../controllers/general.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);

// router.get("/user/:id", getUser);
// router.get("/dashboard", getDashboardStats);

export default router;
