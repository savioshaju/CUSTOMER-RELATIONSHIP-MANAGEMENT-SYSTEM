import { Router } from "express";
import { validateUser } from "../middleware/useMiddlewares.js";
import { addNewUser } from "../controllers/userControllers.js";
import { loginUser } from "../controllers/userControllers.js";
import { updateUser } from "../controllers/userControllers.js";
import { getAll } from "../controllers/userControllers.js";
import { deleteUser } from "../controllers/userControllers.js";
const router = Router();

router.route('/newUser').post(validateUser,addNewUser)
router.route('/login').post(validateUser,loginUser)
router.route('/update/:username').patch(updateUser)
router.route('/getAll').get(getAll)
router.route('/delete/:username').delete(deleteUser)
export default router;
