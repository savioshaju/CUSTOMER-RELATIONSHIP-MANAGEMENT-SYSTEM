import { User } from "../models/usersModels.js";
import { Customer } from "../models/customersModels.js";
import { statusCodes } from "../../helpers/userHelper.js";
import mongoose from "mongoose";

export const validateCase = async (req, res, next) => {
    try {
        const { customer_id, assigned_to, priority, status } = req.body || {};

        const validPriorities = ['low', 'medium', 'high'];
        const validStatuses = ['open', 'in_progress', 'closed'];

        const errors = [];

        if (!customer_id || !mongoose.Types.ObjectId.isValid(customer_id)) {
            errors.push("No valid Customer ID found");
        } else {
            const customer = await Customer.findById(customer_id);
            if (!customer) errors.push("Customer ID does not exist");
        }

        if (!assigned_to || !mongoose.Types.ObjectId.isValid(assigned_to)) {
            errors.push("No valid Assigned User ID found");
        } else {
            const user = await User.findById(assigned_to);
            if (!user) errors.push("Assigned user ID does not exist");
        }

        
        if (!priority) {
            req.body.priority = 'low';
        } else if (!validPriorities.includes(priority)) {
            errors.push("Invalid priority value.");
        }

        if (!status) {
            req.body.status = 'open';
        } else if (!validStatuses.includes(status)) {
            errors.push("Invalid status value.");
        }

        if (errors.length > 0) {
            const resStatus = statusCodes.find(item => item.code === 400) || { code: 400, message: "Validation Error" };
            return res.status(resStatus.code).json({
                success: false,
                message: resStatus.message,
                errors,
            });
        }

        next();

    } catch (error) {
        console.error("Error validating case:", error);
        const resStatus = statusCodes.find(item => item.code === 500) || { code: 500, message: "Server Error" };
        return res.status(resStatus.code).json({
            success: false,
            message: resStatus.message,
            error: "Internal server error during case validation",
        });
    }
};


export const validateCaseUpdate = async (req, res, next) => {
    const { customer_id, assigned_to, priority, status } = req.body || {};
    const { id } = req.params;

    const validPriorities = ['low', 'medium', 'high'];
    const validStatuses = ['open', 'in_progress', 'closed'];
    const errors = [];

    const updates = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
        errors.push("Invalid Case ID.");
    }

    if (customer_id) {
        if (!mongoose.Types.ObjectId.isValid(customer_id)) {
            errors.push("Invalid Customer ID.");
        } else {
            const customer = await Customer.findById(customer_id);
            if (!customer) errors.push("Customer not found.");
            else updates.customer_id = customer_id;
        }
    }

    if (assigned_to) {
        if (!mongoose.Types.ObjectId.isValid(assigned_to)) {
            errors.push("Invalid Assigned User ID.");
        } else {
            const user = await User.findById(assigned_to);
            if (!user) errors.push("Assigned user not found.");
            else updates.assigned_to = assigned_to;
        }
    }

    if (priority) {
        if (!validPriorities.includes(priority)) {
            errors.push("Invalid priority value.");
        } else {
            updates.priority = priority;
        }
    }

    if (status) {
        if (!validStatuses.includes(status)) {
            errors.push("Invalid status value.");
        } else {
            updates.status = status;
        }
    }

    if (errors.length > 0) {
        const resStatus = statusCodes.find((item) => item.code === 400) || { code: 400, message: "Bad Request" };
        return res.status(resStatus.code).json({
            success: false,
            message: resStatus.message,
            errors,
        });
    }

   
    req.caseUpdates = updates;

    next();
};
