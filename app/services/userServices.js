import { User } from "../models/usersModels.js";

export const createUserService = async (userData) => {
    try {
        if (!userData.role) {
            userData.role = 'user';
        }
        const user = await User.create(userData);
        console.log("User created:", user);
        return user;
    } catch (error) {
        console.error("Error creating user:", error);

    }
};


export const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch (error) {
        console.error("Error finding user:", error);

    }
}

export const updateUserService = async (username, updates) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $set: updates },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        
    }
};

export const getUserService = async ()=>{
    try {
        const users = await User.find({})
        return users
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

export const deleteUserService = async (username)=>{
    try {
        const deletedUser = await User.findOneAndDelete({username: username})
        return deletedUser
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
