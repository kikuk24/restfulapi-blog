import express from "express";
import { getAllBlogs, getSingleBlog, createBlog, updateBlog, deleteBlog, getBlogs, getBlogsBySlug, searchBlogAndPaginate } from "../controllers/Blogs.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/blogs", getBlogs);
router.get("/searchblogs", searchBlogAndPaginate);
router.get("/blogs/:id", getBlogsBySlug);
router.get("/adminblogs", verifyUser, getAllBlogs);
router.get("/adminblogs/:id", getSingleBlog);
router.post("/blogs", verifyUser, createBlog);
router.patch("/blogs/:id", verifyUser, updateBlog);
router.delete("/blogs/:id", verifyUser, deleteBlog);

export default router