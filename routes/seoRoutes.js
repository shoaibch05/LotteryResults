import express from "express";
import {
  getAllSEO,
  getSEOByPage,
  updateSEO,
} from "../controllers/seoController.js";

const router = express.Router();

router.get("/", getAllSEO);
router.get("/:page", getSEOByPage);
router.put("/:page", updateSEO);

export default router;
