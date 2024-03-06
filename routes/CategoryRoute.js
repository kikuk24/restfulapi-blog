import express from "express";
import { getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory } from "../controllers/Categories.js";

const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/categories/:id", getSingleCategory);
router.post("/categories", createCategory);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router