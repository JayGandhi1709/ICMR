import bodyParser from "body-parser";
import express from "express";
import { CSTConroller, CSTUniqueCodeGenrator } from "../controller/CST.js";
const router = express.Router();
const jsonparser = bodyParser.json();

router.post("/cstdata", jsonparser, CSTConroller);
router.post("/cstuniquecodegenrate", jsonparser, CSTUniqueCodeGenrator);

export default router;
