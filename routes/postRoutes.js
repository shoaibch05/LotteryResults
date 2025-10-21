import express from "express";
import {
  getPosts,
  getPostsNumber,
  getSinglePost,
  addPost,
  getCategories,
  getCategoriesNum,
  removePost,
  updatePostbyid,
  getlatPostbyCat,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/n", getPostsNumber);
router.get("/category", getCategories);
router.get("/category/n", getCategoriesNum);
router.get("/:category", getlatPostbyCat);
router.get("/:id", getSinglePost);
router.put("/:id", updatePostbyid);
router.post("/", addPost);
router.delete("/:id", removePost);

export default router;
