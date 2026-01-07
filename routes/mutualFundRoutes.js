import express from "express";
import { searchMutualFunds } from "../controller/mutualFundController.js";

const router = express.Router();

router.get("/search", searchMutualFunds);

export default router;
