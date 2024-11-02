import axios from "axios";
import { BACKEND_URL } from "../utils/constant";


export const createTask = async ({ data, id }) => {
    try {
        const URL = id ? `${BACKEND_URL}/task/${id}` : `${BACKEND_URL}/task`;
        // const URL = `${BACKEND_URL}/task`;
        const token = localStorage.getItem('token');
        const response = await axios.post(URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        console.log(response.data)
        return response;
    }
    catch (error) {
        return new Error(error.response.data.message);
    }
}

export const getTasks = async (id) => {
    try {
        const URL = id ? `${BACKEND_URL}/task/${id}` :  `${BACKEND_URL}/task`;
        // const URL = `${BACKEND_URL}/task`;
        const response = await axios.get(URL);
        return response;
    }
    catch (error) {
        return new Error(error.response.data.message);
    }
}

export const deleteTask = async (id) => {
    try {
        console.log("delete")
        const URL = `${BACKEND_URL}/task/${id}`;
        const token = localStorage.getItem('token');
        const response = await axios.delete(URL, {
            headers: {
                'Authorization': token
            }
        });
        return response;
    }
    catch (error) {
        return new Error(error.response.data.message);
    }
}


export const updateTask = async (id, newCategory) => {
    try {
        const URL = `${BACKEND_URL}/task/${id}`;
        const token = localStorage.getItem('token');
        const response = await axios.patch(URL, newCategory, {
            headers: {
                'Authorization': token
            }
        });
        return response;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error updating task'
        };
    }
};



// export const updateTask = async (id) => {
//     try {
//         const URL = `${BACKEND_URL}/task/${id}`;
//         const token = localStorage.getItem('token');
//         const response = await axios.update(URL, {
//             headers: {
//                 'Authorization': token
//             }
//         });
//         return response;
//     }
//     catch (error) {
//         return new Error(error.response.data.message);
//     }
// }