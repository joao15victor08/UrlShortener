import { Router } from "express";

import {
	createUrl,
	getAllUrl,
	getUrl,
	updateUrl,
	deleteUrl,
} from "../controllers/Url";

const router = Router();

router.get("/", getAllUrl);
router.get("/:id", getUrl);
router.post("/", createUrl);
router.put("/", updateUrl);
router.delete("/:id", deleteUrl);

export default router;
