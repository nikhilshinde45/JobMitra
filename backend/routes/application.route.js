import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyjob, updateStatus } from '../controllers/application.controller.js';
import { getAppliedjobs } from '../controllers/application.controller.js';
import {getApplicants} from '../controllers/application.controller.js'

const router=express.Router();

router.route("/apply/:id").post(isAuthenticated,applyjob);
router.route("/get").get(isAuthenticated,getAppliedjobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;