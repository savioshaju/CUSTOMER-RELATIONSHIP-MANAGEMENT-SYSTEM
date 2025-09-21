import { Router } from "express";
import { createCustomer } from "../controllers/customerControllers.js";
import { getAllCustomers,getCustomerById } from "../controllers/customerControllers.js";
import { updateCustomer,deleteCustomer } from "../controllers/customerControllers.js";
import { validateCustomer } from "../middleware/customerMiddleware.js";
const router = Router();


router.route('/create').post(validateCustomer,createCustomer);
router.route('/getAll').get(getAllCustomers);
router.route('/getById/:id').get(getCustomerById);
router.route('/update/:id').patch(updateCustomer);
router.route('/delete/:id').delete(deleteCustomer);

export default router;
