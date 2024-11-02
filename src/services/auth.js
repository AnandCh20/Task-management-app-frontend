import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

export const register = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, {
            name,
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    }
    catch (error) {
        return new Error(error.response.data.message);
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response;
    }
    catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const updatePassword = async ({ email, password, newPassword }) => {
    try {
        console.log("Sending request with data:", {
            email,
            password,
            newPassword
        });
        const response = await axios.post(`${BACKEND_URL}/auth/updatepassword`,{ email, password, newPassword },
            {
                headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        console.log("Response received:", response);
        return response;
    } catch (error) {
        console.error(
            "Error in updatePassword:",
            error.response?.data || error.message
        );
        throw new Error(error.response?.data?.message || "Error updating password");
    }
};

