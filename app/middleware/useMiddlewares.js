import { statusCodes } from "../../helpers/userHelper.js";

export const validateUser = (req, res, next) => {

    const { username, password, role } = req.body || {};
    const status = statusCodes.find((item) => item.code === 400);

    const errors = [];

    if (!username) errors.push("User Name not present");
    if (!password) errors.push("Password is not present");

    const validRoles = ["admin", "user"];
    if (role && !validRoles.includes(role)) {
        errors.push("Invalid role provided.");
    }

    if (errors.length > 0) {

        return res.status(status.code).json({ sucess: false, errors, message: status.message })
    }




    next();

}