import { statusCodes } from "../../helpers/userHelper.js";

export const validateCustomer = (req, res, next) => {
    const { name, contact_info, status } = req.body || {};

    const errors = [];

    if (!name) errors.push("Customer name is required.");


    const validStatus = ['active', 'inactive'];
    if (!status) {
        req.body.status = 'active';
    } else if (!validStatus.includes(status)) {
        errors.push("Invalid Status.");
    }


    if (contact_info) {
        const { email, phone, address } = contact_info;


        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push("Invalid email.");
            }
        }


        if (phone) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                errors.push("Invalid Phone number.");
            }
        }
    }


    const resStatus = statusCodes.find((item) => item.code === 400);

    if (errors.length > 0) {

        return res.status(resStatus.code).json({ sucess: false, errors, message: resStatus.message })
    }

    next();
};
