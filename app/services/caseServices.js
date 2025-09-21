import { Case } from "../models/casesModels.js";


export const newCaseService = async (caseData) => {
    try {
        const newCase = await Case.create(caseData);
        return newCase;
    } catch (error) {
        console.error("Error creating case:", error);
        return null;
    }
};


export const getAllCaseService = async () => {
    try {
        const cases = await Case.find({});
        return cases;
    } catch (error) {
        console.error("Error fetching all cases:", error);
        return [];
    }
};


export const getCaseByIdService = async (id) => {
    try {
        return await Case.findById(id);
    } catch (error) {
        console.error("Error fetching case by ID:", error);
        return null;
    }
};


export const deleteCaseByIdService = async (id) => {
    try {
        return await Case.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error deleting case:", error);
        return null;
    }
};


export const updateCaseService = async (id, updates) => {
    try {
        const updatedCase = await Case.findByIdAndUpdate(id, { $set: updates }, { new: true });
        return updatedCase;
    } catch (error) {
        console.error("Error updating case:", error);
        return null;
    }
};
