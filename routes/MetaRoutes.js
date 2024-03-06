import express from "express";
import { getMeta, createMeta, updateMeta, deleteMeta } from "../controllers/Meta.js";
const router = express.Router();

router.get("/meta", getMeta);
router.post("/meta", createMeta);
router.patch("/meta/:id", updateMeta);
router.delete("/meta/:id", deleteMeta);

export default router