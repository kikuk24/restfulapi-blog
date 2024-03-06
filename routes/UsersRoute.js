import express from "express";
import { getAllUsers, getSingleUser, createUser, updateUser, deleteUser } from '../controllers/Users.js'
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();
router.get('/', (req, res) => {
  res.send('Server Berjalan Dengan Aman!')
})
router.get("/users", verifyUser, adminOnly, getAllUsers);
router.get("/users/:id", verifyUser, adminOnly, getSingleUser);
router.post("/users", verifyUser, adminOnly, createUser);
router.post("/gaeadmin", createUser);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;