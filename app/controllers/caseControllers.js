import { statusCodes } from "../../helpers/userHelper.js";
import { newCaseService, getAllCaseService, getCaseByIdService, deleteCaseByIdService, updateCaseService } from "../services/caseServices.js"
import mongoose from "mongoose";

export const createCase = async (req, res) => {
    try {

        const { customer_id, assigned_to, priority, status } = req.body || {};
        const payload = { customer_id, assigned_to, priority, status }
        const response = await newCaseService(payload)

        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Failed creating new case" });
        }

        const resStatus = statusCodes.find((item) => item.code === 201);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });

    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error adding new case" });
    }
}

export const getAllCase = async (req, res) => {
    try {
        const response = await getAllCaseService()
        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No cases found" });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });
    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error finding cases" });
    }
}

export const getCaseById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const resStatus = statusCodes.find((item) => item.code === 400);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No valid id found" });
        }
        const response = await getCaseByIdService(id)
        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No case found" });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });
    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error finding case" });
    }
}


export const deleteCase = async (req, res) => {
    try {
        const { id } = req.params
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            const resStatus = statusCodes.find((item) => item.code === 400);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No valid id found" });
        }
        const response = await deleteCaseByIdService(id)
        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 500);
            return res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "No case found" });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({ success: true, message: resStatus.message, customer: response });

    } catch (error) {
        console.error(error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({ success: false, message: resStatus.message, error: "Error deleting case" });
    }
}

export const updateCase = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.caseUpdates;
        const response = await updateCaseService(id, updates);

        if (!response) {
            const resStatus = statusCodes.find((item) => item.code === 404);
            return res.status(resStatus.code).json({
                success: false, message: resStatus.message, error: "Case not found",
            });
        }

        const resStatus = statusCodes.find((item) => item.code === 200);
        res.status(resStatus.code).json({
            success: true, message: resStatus.message, customer: response
        });

    } catch (error) {
        console.error("Error updating case:", error);
        const resStatus = statusCodes.find((item) => item.code === 500);
        res.status(resStatus.code).json({
            success: false, message: resStatus.message, error: "Error updating case"
        });
    }
};
