import React from 'react';
import './TaskCard.css'; // Add your CSS styles here

export const TaskCard = ({ isOpen, onClose, onSave, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};


// const TaskCard = ({ task }) => {
//     return (
//         <div className="task-card">
//             <div className={`priority ${task.priority.toLowerCase()}`}>
//                 {task.priority}
//             </div>
//             <h3>{task.title}</h3>
//             <p>Checklist: {task.checklist}</p>
//             <div className="task-dates">
//                 <p>{task.date}</p>
//                 <p>{task.status}</p>
//             </div>
//         </div>
//     );
// };


export default TaskCard;
