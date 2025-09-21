import { Customer } from "../models/customersModels.js";

export const newCustomerService = async (customerData) => {
    try {
        const customer = await Customer.create(customerData)
        return customer
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

export const getAllCustomerService = async () => {
    try {
        const customers = await Customer.find({})
        return customers
    } catch (error) {
        console.error("Error creating user:", error);

    }
}

export const getAllCustomerByIdService = async (id) =>{
    try {
         return await Customer.findById(id)
    } catch (error) {
        console.error("Error creating user:", error);
        
    }
}


export const deleteCustomerByIdService = async (id) =>{
    try {
         return await Customer.findByIdAndDelete(id)
    } catch (error) {
        console.error("Error creating user:", error);
        
    }
}

export const updateCustomerService = async (id, updates) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { $set: updates }, { new: true });
        return updatedCustomer;
    } catch (error) {
        console.error("Error updating customer", error);
        return null;
    }
};