import express from 'express'
import {registercompany} from '../controllers/company.controller.js'
import {getCompany} from '../controllers/company.controller.js'
import { getCompanyById } from '../controllers/company.controller.js';
import { updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router=express.Router();

router.route("/register").post(isAuthenticated,registercompany);

router.route("/get").get(isAuthenticated,getCompany);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);


export default router;