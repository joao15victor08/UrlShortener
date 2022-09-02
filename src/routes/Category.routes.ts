import { Router } from "express";
import {
	createCategory,
	getAllCategorys,
	updateCategory,
	deleteCategory,
} from "../controllers/Category";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategorys);
router.put("/", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
