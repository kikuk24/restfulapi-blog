import express from "express";
import { getAllPortofolios, getSinglePortofolio, createPortofolio, updatePortofolio, deletePortofolio } from "../controllers/Portofolios.js";

const router = express.Router();
router.get("/portofolios", getAllPortofolios);
router.get("/portofolios/:id", getSinglePortofolio);
router.post("/portofolios", createPortofolio);
router.patch("/portofolios/:id", updatePortofolio);
router.delete("/portofolios/:id", deletePortofolio);

export default router