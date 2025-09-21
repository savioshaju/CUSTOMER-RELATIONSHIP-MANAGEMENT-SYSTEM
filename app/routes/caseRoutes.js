import { Router } from "express";


import { validateCase ,validateCaseUpdate} from "../middleware/caseMiddleware.js";
import { createCase,getAllCase,getCaseById,deleteCase,updateCase} from "../controllers/caseControllers.js";

const router = Router();


router.route('/create').post(validateCase,createCase);
router.route('/getAll').get(getAllCase);
router.route('/getById/:id').get(getCaseById);
router.route('/update/:id').patch(validateCaseUpdate,updateCase);
router.route('/delete/:id').delete(deleteCase);


export default router;
