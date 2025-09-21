import bcrypt from 'bcrypt';
import { statusCodes } from '../../helpers/userHelper.js';
import { createUserService } from '../services/userServices.js';
import { findUserByUsername } from '../services/userServices.js';
import { updateUserService } from '../services/userServices.js';
import { getUserService } from '../services/userServices.js';
import { deleteUserService } from '../services/userServices.js';

export const addNewUser = async (req, res) => {
    try {
        const { username, password, role } = req.body || {}
        const saltRounds = 10;

        const password_hash = await bcrypt.hash(password, saltRounds);
        const payload = { username, password_hash, role };

        const response = await createUserService(payload)

        if (!response) {
            const status = statusCodes.find((item) => item.code === 500);
            return res.status(status.code).json({ success: false, message: status.message, error: "Failed creating new user" });
        }

        const status = statusCodes.find((item) => item.code === 201);
        res.status(status.code).json({ success: true, message: status.message, user: response });

    } catch (error) {
        console.error(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: status.message, error: "Error adding new user" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body || {}

        const user = await findUserByUsername(username);
        if (!user) {
            const status = statusCodes.find((item) => item.code === 401);
            return res.status(status.code).json({ success: false, message: status.message, error: "Invalid username or password" });
        }


        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            const status = statusCodes.find((item) => item.code === 401);
            return res.status(status.code).json({ success: false, message: status.message, error: "Invalid username or password" });
        }

        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: status.message, user: user });

    } catch (error) {
        console.error(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: status.message, error: "Error logging user" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { newUsername, newPassword, newRole } = req.body || {};
        const { username } = req.params;
        if (!username) {
            const status = statusCodes.find((item) => item.code === 400);
            return res.status(status.code).json({
                success: false,
                message: status.message, error: "Username parameter is missing"
            });
        }

        const updates = {};

        if (newUsername) updates.username = newUsername;
        if (newRole) updates.role = newRole;


        if (newPassword) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            updates.password_hash = hashedPassword;
        }
        console.log("🔍 Updates to apply:", updates);

        const response = await updateUserService(username, updates)

        if (!response) {
            const status = statusCodes.find((item) => item.code === 404);
            return res.status(status.code).json({
                success: false,
                message: status.message,
                error: "User not found",
            });
        }

        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: status.message, user: response });

    } catch (error) {
        console.error(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: status.message, error: "Error updating user" });
    }

}

export const getAll = async (req, res) => {
    try {

        const response = await getUserService()

        if (!response) {
            const status = statusCodes.find((item) => item.code === 500);
            return res.status(status.code).json({ success: false, message: status.message, error: "No user found" });
        }

        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: status.message, user: response });
    } catch (error) {
        console.error(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: status.message, error: "Error finding user" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { username } = req.params

        const response = await deleteUserService(username)
        if (!response) {
            const status = statusCodes.find((item) => item.code === 500);
            return res.status(status.code).json({ success: false, message: status.message, error: "No user found" });
        }

        const status = statusCodes.find((item) => item.code === 200);
        res.status(status.code).json({ success: true, message: status.message, user: response });

    } catch (error) {
        console.error(error);
        const status = statusCodes.find((item) => item.code === 500);
        res.status(status.code).json({ success: false, message: status.message, error: "Error deleting user" });
    }
}