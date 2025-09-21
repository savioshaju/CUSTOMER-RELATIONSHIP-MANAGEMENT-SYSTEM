import { statusCodes } from "../../helpers/userHelper.js";
import { Customer } from "../models/customersModels.js";
import { newCustomerService } from "../services/customerServices.js";
import { getAllCustomerService } from "../services/customerServices.js";
import { getAllCustomerByIdService } from "../services/customerServices.js";
import mongoose from "mongoose";
import { deleteCustomerByIdService } from "../services/customerServices.js";
import { updateCustomerService } from "../services/customerServices.js";
export const createCustomer = async (req, res) => {
    try {
        const { name, contact_info, status } = req.body || {};

        const payload = { name, contact_info, status }

        const response = await newCustomerService(payload)

        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Failed creating new customer" });
        }

        const resStatus = statusCodes.find((item) => item.code === 201);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });

    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error adding new customer" });
    }
}

export const getAllCustomers = async (req, res) => {
    try {
        const response = await getAllCustomerService()
        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No customers found" });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });
    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error finding customer" });
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const resStatus = statusCodes.find((item) => item.code === 400);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No valid id found" });
        }
        const response = await getAllCustomerByIdService(id)
        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No customer found" });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });
    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error finding customer" });
    }
}


export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const resStatus = statusCodes.find((item) => item.code === 400);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No valid id found" });
        }
        const response = await deleteCustomerByIdService(id)
        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 500);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No customer found" });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });

    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error deleting customer" });
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;


        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const resStatus = statusCodes.find((item) => item.code === 400);
            return res.status(resStatus.code).json({  success: false,  message: resStatus.message,  error: "Invalid customer ID" 
            });
        }

        const { name, contact_info, status } = req.body || {};
        const updates = {};
        const errors = [];

        if (name) updates.name = name;
        if (status) {
            const validStatuses = ['active', 'inactive'];
            if (!validStatuses.includes(status)) {
                errors.push("Invalid status value.");
            } else {
                updates.status = status;
            }
        }

        if (contact_info) {
            const { email, phone, address } = contact_info;
            updates.contact_info = {};

            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    errors.push("Invalid email.");
                } else {
                    updates.contact_info.email = email;
                }
            }

            if (phone) {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(phone)) {
                    errors.push("Invalid phone number.");
                } else {
                    updates.contact_info.phone = phone;
                }
            }

            if (address) {
                updates.contact_info.address = address;
            }
        }

        
        if (errors.length > 0) {
            const resStatus = statusCodes.find((item) => item.code === 400);
            return res.status(resStatus.code).json({  success: false,  message: resStatus.message,   errors 
            });
        }

        
        const response = await updateCustomerService(id, updates);

        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({  success: false, message: resStatus.message, error: "Customer not found",
            });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({  success: true,  message: resStatus.message,  customer: response 
        });

    } catch (error) {
        console.error("Error updating customer:", error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false,  message: resStatus.message,  error: "Error updating customer" 
        });
    }
};
