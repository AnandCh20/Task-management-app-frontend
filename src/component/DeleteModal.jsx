// DeleteConfirmationModal.js
import React, { useContext } from 'react';
import { getTasks, deleteTask } from '../services/task.js';
import { AppContext } from '../contexts/AppContext.jsx';
import toast from "react-hot-toast";
import '../component/deleteModal.css'

const MyDeleteModal = () => {
    const { state, setState, deleteId, setDeleteId, DeleteModal, setDeleteModal } = useContext(AppContext);
    console.log(deleteId);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            if (response.status === 200) {
                setState(response.data);
            } else {
                console.error("Error fetching tasks:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    fetchTasks()

    const handleDeleteCard = async () => {
        try {
            const response = await deleteTask(deleteId);
            if (response.status === 200) {
                toast.success('Task deleted successfully');
                fetchTasks();  // Fetch updated tasks
                setDeleteModal(false); // Close the modal
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Task deletion failed');
            console.log(error);
        }
    };

    return (
        <div className="confirmation-popup">
            <div className="popup-content">
                <h4>Are you sure you want to Delete?</h4>
                <div className="popup-buttons">
                    <button
                        className="confirm-button"
                        onClick={handleDeleteCard}  // Call the function directly
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => setDeleteModal(false)}  // Close the modal on cancel
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyDeleteModal;
