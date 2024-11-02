// Dashboard Previous Code
// import React, { useState } from 'react';
// import Sidebar from './SideBar';
// import toast from "react-hot-toast";
// import './Task.css';
// import { TaskCard } from './TaskCard.jsx'; 
// import { useParams } from 'react-router-dom';
// import {createTask} from '../services/task.js';
// import addButton from '../assets/Add.png';
// import collapseButton from '../assets/collapse.png';
// import redEllipse from '../assets/red.png';
// import blueEllipse from '../assets/blue.png';
// import greenEllipse from '../assets/green.png';
// import bin from '../assets/Delete.png';


// export const Task = () => {
//     const { id } = useParams();
//     const [showTaskBar, setShowTaskBar] = useState(false);
//     const [taskData, setTaskData] = useState({
//         title: "",
//         priority: "",
//         checklist: [],
//         dueDate: ""
//     });
//     const [checklist, setChecklist] = useState([]);
//     const [newChecklistItem, setNewChecklistItem] = useState('');
//     const [dueDate, setDueDate] = useState("");
  
//     const handleAddChecklistItem = () => {
//       if (newChecklistItem.trim()) {
//         setChecklist([...checklist, newChecklistItem]);
//         setNewChecklistItem(''); // clear the input
//       }
//     };

//     const handleDeleteChecklistItem = (index) => {
//         setChecklist(checklist.filter((_, i) => i !== index));
//     };

//     //states for calendar
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [selectedDate, setSelectedDate] = useState("");

//     console.log(setDueDate);

//     const toggleCalendar = () => {
//         setShowCalendar(!showCalendar);
//     };

//     const handleDateChange = (event) => {
//         const newDate = event.target.value;
//         setSelectedDate(newDate);
//         setShowCalendar(false);
//     };

//     const formatDate = (date) => {
//         if (!date) return "Select Due Date";
//         const options = { year: "numeric", month: "long", day: "numeric" };
//         return new Date(date).toLocaleDateString(undefined, options);
//     };
    
    

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "priority") {
//             console.log(value);
//             setTaskData((prevData) => ({
//                 ...prevData,
//                 priority: value,
//             }));
//         } else {
//             setTaskData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };
    
//     console.log(taskData)

//     const handleSaveCard = async (e) => {
//         e.preventDefault();
//         const data = { ...taskData };
//         if (!taskData.title || !taskData.priority || taskData.checklist.length === 0 || !taskData.dueDate) {
//             toast.error("Please fill in all required fields");
//             return;
//         }

//         try {
//           const taskId = id ? id : null;
//             const response = await createTask({ data, id: taskId });
//             console.log("response");
//             if (response.status === 200) {
//                 toast.success("Task created successfully");
//                 setTaskData(response.data)
//                 setShowTaskBar(false);
//                 setTaskData({ title: "", priority: "", checklist: [], dueDate: "" });
//             }
//             else {
//               toast.error('Task creation failed');
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const handleCloseModal = () => {
//         setShowTaskBar(false);
//     };

//     return (
//         <div className="dashboard">
//             <Sidebar />
//             {/* Dashboard */}
//             <div className="board">
//                 <header className="dashboard-header">
//                     <h1>Welcome! Kumar</h1>
//                     <p>12th Jan, 2024</p>
//                 </header>
//                 <div className="task-columns">
//                     <div className="column">
//                         <h2>Backlog</h2>
//                     </div>
//                     <div className="column">
//                         <div className="add-task">
//                             <h2>To do</h2>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//                                 <img src={addButton} alt="Add" onClick={() => setShowTaskBar(true)} />
//                                 <img src={collapseButton} alt="Collapse" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="column">
//                         <h2>In progress</h2>
//                     </div>
//                     <div className="column">
//                         <h2>Done</h2>
//                     </div>
//                 </div>
//             </div>


//             {/* Modal Component */}
//             <TaskCard isOpen={showTaskBar} onClose={handleCloseModal}>
//                 <form onSubmit={handleSaveCard}>
//                     {/* Task Title */}
//                     <div>
//                         <p>Title <span style={{ color:"red"}}>*</span></p>
//                         <input 
//                             type="text" 
//                             placeholder='Enter Task Title' 
//                             name="title" 
//                             value={taskData.title} 
//                             onChange={handleOnChange}  
//                             required
//                         />
//                     </div>
                    
//                     {/* Select Priority  */}
//                     <p>Select Priority
//                         <span style={{ color:"red"}}>*</span>
//                         <button 
//                             className="modes"
//                             type="button"
//                             value="high"
//                             name="priority"
//                             onClick={handleOnChange}
//                         >
//                             <span style={{display:"flex", justifyContent:"space-between",paddingRight:'4px'}}><img src={redEllipse} alt="redEllipse" /></span>HIGH PRIORITY
//                         </button>
//                         <button 
//                             className="modes"
//                             type="button"
//                             value="moderate"
//                             name="priority"
//                             onClick={handleOnChange}
//                         >
//                             <span><img src={blueEllipse} alt="blueEllipse" /></span>MODERATE PRIORITY
//                         </button>
//                         <button 
//                             className="modes"
//                             type="button"
//                             value="low"
//                             name="priority"
//                             onClick={handleOnChange}
//                         >
//                             <span><img src={greenEllipse} alt="greenEllipse" /></span>LOW PRIORITY
//                         </button>
//                     </p>

//                     {/* Assign to  */}
//                     <div>
//                         <p>Assign to 
//                             <span>
//                             <input 
//                                 type="text" 
//                                 placeholder='Add a assignee' 
//                                 name="assign" 
//                                 value={taskData.assign} 
//                                 onChange={handleOnChange}  
//                             />
//                             </span>
//                         </p>

//                     </div>

                 
//                     {/* Checklist */}
//                     <div>
//                         <label>
//                             Checklist ({checklist.length}/0) <span >*</span>
//                         </label>
//                         {/* <div> */}
                        
//                         <div>
//                         {checklist.map((item, index) => (
//                             <div key={index} className="text-gray-700">
//                                <span style={{
//                                 display:"flex",
//                                 justifyContent:"space-between",
//                                 alignItems:"center"
//                                }}>
//                                 <input type="checkbox" value={item} name={`checkbox${index}`}  /> 
//                                     {item }
//                                     <img src={bin} alt="Delete" onClick={() => handleDeleteChecklistItem(index)} />
//                                </span> 
//                             </div>
//                         ))}
//                         </div>

//                         <input
//                             type="text"
//                             value={newChecklistItem}
//                             onChange={(e) => setNewChecklistItem(e.target.value)}
//                             // onClick={handleAddChecklistItem}
//                             onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                     handleAddChecklistItem();
//                                 }
//                             }}
//                             placeholder="+ Add New"
//                             style={{
//                                 width: '50%',
//                                 padding: '5px',
//                                 fontSize: '12px',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
//                                 marginBottom: '5px'
//                             }}
//                         />
//                     {/* </div> */}
                  
//                     </div>
//                         {/* Footer Buttons */}
//                         <div className="modal-footer">
//                             <button
//                                 type="button"
//                                 name="date"
//                                 className="select-due-date"
//                                 onClick={toggleCalendar}
//                             >
//                             {formatDate(selectedDate)}
//                             </button>

//                             {/* Show the calendar  */}
//                             {showCalendar && (
//                             <div className="calendar-popup">
//                                 <input
//                                     type="date"
//                                     value={selectedDate}
//                                     onChange={handleDateChange}
//                                     className="date-input"
//                                 />
//                             </div>
//                             )}
//                         <button type="button" className="cancel-btn" onClick={handleCloseModal}>
//                             Cancel
//                         </button>
//                         <button type="submit" className="save-btn">
//                             Save
//                         </button>
//                         </div>
//                 </form>    
//             </TaskCard>
//         </div>
//     );
// };




// import React from 'react';
// import Sidebar from './SideBar'; // Import the Sidebar component
// import './Task.css';
// import Modal from './TaskCard.jsx';
// import addButton from '../assets/Add.png'
// import collapseButton from '../assets/collapse.png'
// import { useState } from 'react';


// export const Task = () => {

//     const [showTaskBar, setShowTaskBar] = useState(false);

//     const handleAddTask = () => {
//         console.log("Add Task button clicked")
//         setShowTaskBar(true);
//     }

//     return (
//         <div className="dashboard">
//             <Sidebar />
//             <div className="board">
//                 <header className="dashboard-header">
//                     <h1>Welcome! Kumar</h1>
//                     <p>12th Jan, 2024</p>
//                 </header>
//                 <div className="task-columns">
//                     {/* You can create a separate component for the Task Board columns if needed */}
//                     <div className="column">
//                         <h2>Backlog</h2>
//                         {/* Add task cards */}
//                         {/* <div className="task-card">
//                             <div className={`priority ${task.priority.toLowerCase()}`}>
//                                 {task.priority}
//                             </div>
//                             <h3>{task.title}</h3>
//                             <p>Checklist: {task.checklist}</p>
//                             <div className="task-dates">
//                                 <p>{task.date}</p>
//                                 <p>{task.status}</p>
//                             </div>
//                         </div> */}
//                         {/* <TaskCard /> */}
//                     </div>
//                     <div className="column">
//                         <div className="add-task">
//                             <h2>To do</h2>
//                             <div style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                             }}>
//                                 <img src={addButton} alt="Add" onClick={handleAddTask} />
//                                 <img src={collapseButton} alt="Collapse" />
//                             </div>

//                         </div>

//                     </div>
//                     <div className="column">
//                         <h2>In progress</h2>
                
//                     </div>
//                     <div className="column">
//                         <h2>Done</h2>
//                     </div>
//                 </div>
//             </div>
//             {/* Modal Component */}
//             <Modal isOpen={showTaskBar} onClose={handleCloseModal}>
//                 <h2>Add New Task</h2>
//                 <form>
//                     <input type="text" placeholder="Task Title" required />
//                     <textarea placeholder="Task Description" required></textarea>
//                     <button type="submit">Add Task</button>
//                 </form>
//                 <button onClick={handleCloseModal}>Close</button>
//             </Modal>
//         </div>
//     );
// };





// import React, { useEffect, useState } from 'react';
// import { createTask, getTasks } from '../services/task'; // Adjust the import path as necessary

// export const Task = () => {
//     const [tasks, setTasks] = useState([]);
//     const [taskData, setTaskData] = useState({ title: '', description: '' });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const fetchTasks = async () => {
//         try {
//             const response = await getTasks({});
//             setTasks(response.data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData({ ...taskData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await createTask({ data: taskData });
//             fetchTasks(); // Refresh the task list
//             setTaskData({ title: '', description: '' }); // Clear form
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Task Manager</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Task Title"
//                     value={taskData.title}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <textarea
//                     name="description"
//                     placeholder="Task Description"
//                     value={taskData.description}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <button type="submit">Create Task</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <h2>Tasks</h2>
//             <ul>
//                 {tasks.map(task => (
//                     <li key={task.id}>
//                         <h3>{task.title}</h3>
//                         <p>{task.description}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };




// // // catch the id from the URL and fetch the job data from the server
// // import { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { getTasks } from '../services/task';

// // export const Task = () => {
// //     const { id } = useParams(); //useParams gets you the url details
// //     const [task, setTask] = useState({});
// //     const [loading, setLoading] = useState(true);
// //     useEffect(() => {
// //         const fetchTask = async () => {
// //             setLoading(true);
// //             const response = await getTasks({ id });
// //             if (response.status === 200) {
// //                 setTask(response.data);
// //             }
// //             setLoading(false);
// //         }
// //         fetchTask();
// //     }, [])
// //     return (
// //         <div>
// //             {loading ? <h1>Loading...</h1> : (
// //                 <div className="task-card">
// //                     <h4>{task.title}</h4>
// //                     <p>Priority: {task.priority}</p>
// //                     <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
// //                     <button onClick={() => updateStatus(task._id, 'in-progress')}>In Progress</button>
// //                     <button onClick={() => updateStatus(task._id, 'done')}>Done</button>
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }




{/* <div>
                        <label>
                            Checklist ({checklist.length}) <span>*</span>
                        </label>
                            <div>
                                {checklist.map((checklistItem, index) => (
                                    <div key={index} className="checklist-item">
                                        <input
                                            type="checkbox"
                                            checked={checklistItem.completed}
                                            onChange={() => toggleChecklistItem(index)}
                                            id={`checklist-item-${index}`}
                                        />
                                        <label htmlFor={`checklist-item-${index}`}>
                                            {checklistItem.item}
                                        </label>
                                        <img
                                            src={bin}
                                            alt="Delete"
                                            onClick={() => handleDeleteChecklistItem(index)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            <input
                                type="text"
                                onChange={(e) => setNewChecklistItem(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                                placeholder="+ Add New"
                                aria-label="New checklist item"
                            />
                            </div> */}
                            {/* Checklist */}

// const handleAddChecklistItem = () => {
    //     if (newChecklistItem.trim()) {
    //         setChecklist(prev => [...prev, { item: newChecklistItem.trim(), completed: newChecklistItem.checked }]);
    //         setNewChecklistItem('');
    //     } else {
    //         toast.error("Checklist item cannot be empty");
    //     }
    // };

    // // Function to toggle the completion status of a checklist item
    // const toggleChecklistItem = (index) => {
    //     setChecklist(prev =>
    //         prev.map((item, i) =>
    //             i === index ? { ...item, completed: !item.completed } : item
    //         )
    //     );
    // };

    // const handleDeleteChecklistItem = (index) => {
    //     setChecklist(checklist.filter((_, i) => i !== index));
    // };

    // const toggleChecklist = () =>{
    //         setisChecklistVisible(!isChecklistVisible);
    // }


const handleChecklistCompletionChange = (e, index) => {
    const updatedChecklist = [...editState.checklist];

    if (e && e.target) {
        updatedChecklist[index].item = e.target.value;
    } else {
        //toggle the completed state
        updatedChecklist[index].completed = !updatedChecklist[index].completed;
    }

    setEditState((prevState) => ({
        ...prevState,
        checklist: updatedChecklist,
    }));
};

{editState.checklist.map((item, index) => (
    <div key={index} className="checklist-item">
      <input
        type="checkbox"
        name="checklist"
        value={item.completed}
        checked={item.completed}
        onChange={() => handleChecklistCompletionChange(index)}
      />
      <input
        type="text"
        value={item.text}
        onChange={(e) =>
          handleChecklistChange(index, e.target.value)
        }
        placeholder="Add Checklist Item"
      />
      <img
        src={deleteButton}
        alt="Delete"
        className="delete-icon"
        onClick={() => handleDeleteChecklistItem(index)}
      />
      
    </div>
))}

// import React, { useState, useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "../styles/TaskBoard.css";
// import taskImg from "../assets/taskImg.png";
// import { AppContext } from "../context/AppContext";
// import { getTasks, updateTask, createTask, deleteTask } from "../services/task";
// import downArrow from "../assets/downArrow.png";
// import upArrow from "../assets/upArrow.png";
// import menu from "../assets/menu.png";
// import deleteButton from "../assets/Delete.png";
// import toast from "react-hot-toast";
// import "../styles/TaskModal.css";
// import { verifyToken } from "../utils/auth";

// const TaskBoard = () => {
//   //states for tasks
//   const { id } = useParams();
//   //for authenticated user
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { state, setState } = useContext(AppContext);
//   const [isChecklistVisible, setIsChecklistVisible] = useState(false);
//   // const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
//     useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [priorities, setPriorities] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [assign, setAssign] = useState("");
//   const [taskData, setTaskData] = useState({
//     title: "",
//     priority: "",
//     assign: "",
//     checklist: [],
//     dueDate: ""
//   });
//   const [newTask, setNewTask] = useState({
//     title: "",
//     assign: "",
//     checklist: [
//       {
//         item: { type: String, required: true },
//         completed: { type: Boolean, default: false }
//       }
//     ],
//     priority: ""
//   });

//   const [showEditTaskBar, setShowEditTaskBar] = useState(false);
//   const [editState, setEditState] = useState("");
//   const [editTaskId, setEditTaskId] = useState("");

//   //states for calendar
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState("");
//   //To Add a new state to track which menu is open
//   const [menuTaskId, setMenuTaskId] = useState(null);
//   // To track which checklist is open
//   const [checklistTaskId, setChecklistTaskId] = useState(null);

//   // Modify toggleChecklist to set the specific task's ID
//   const toggleChecklist = (taskId) => {
//     setChecklistTaskId(checklistTaskId === taskId ? null : taskId);
//   };

//   // Modify toggleMenu to set the specific task's ID
//   const toggleMenu = (taskId) => {
//     setMenuTaskId(menuTaskId === taskId ? null : taskId);
//   };

//   //fetch the data from the database
//   const fetchTasks = async () => {
//     try {
//       const response = await getTasks();
//       if (response.status === 200) {
//         setTasks(response.data);
//         setState(response.data);
//       } else {
//         console.error("Error fetching tasks:", response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [id]);

//   //fetch user, only authenticated user can delete the tasks (To verify user)
//   const fetchUser = async () => {
//     const response = await verifyToken();
//     if (response.status === 200) {
//       setUser(response.data);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setNewTask({ title: "", assign: "", checklist: [], priority: "Low" });
//   };

//   //To delete the task
//   const handleDelete = async (taskId) => {
//     try {
//       console.log("Deleting task with ID:", taskId);
//       const response = await deleteTask(taskId);
//       console.log("Delete response:", response);

//       if (response.status === 200) {
//         toast.success("Task deleted successfully");
//         fetchTasks();
//         // Close the modal after deletion
//         setIsDeleteConfirmationVisible(false);
//       } else {
//         toast.error(
//           response.message || "An error occurred while deleting the task"
//         );
//       }
//     } catch (error) {
//       toast.error("Task deletion failed");
//       console.error("Error details:", error);
//     }
//   };

//   //To update category on click
//   const handleUpdateCategory = async (id, newCategory) => {
//     try {
//       const response = await updateTask(id, { category: newCategory });

//       if (response.status === 200) {
//         toast.success("Task updated successfully");
//         console.log("Updated task:", response.data);
//         await fetchTasks();
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Task update failed");
//     }
//   };

//   const confirmDelete = (id) => {
//     setTaskToDelete(id);
//     setIsDeleteConfirmationVisible(true);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const month = date.toLocaleString("en-US", { month: "short" });
//     const day = date.getDate();
//     const suffix =
//       day % 10 === 1 && day !== 11
//         ? "st"
//         : day % 10 === 2 && day !== 12
//         ? "nd"
//         : day % 10 === 3 && day !== 13
//         ? "rd"
//         : "th";
//     return `${month} ${day}${suffix}`;
//   };

//   // To Filter all the tasks by category
//   const backlogTasks = state.filter((task) => task.category === "Backlog");
//   const todoTasks = state.filter((task) => task.category === "To-do");
//   const inProgressTasks = state.filter(
//     (task) => task.category === "In Progress"
//   );
//   const doneTasks = state.filter((task) => task.category === "Done");

//   //Functions for task modal
//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };

//   const handleDateChange = (event) => {
//     const newDate = event.target.value;
//     setSelectedDate(newDate);
//     setShowCalendar(false);
//     setTaskData((prevTaskData) => ({
//       ...prevTaskData,
//       dueDate: newDate
//     }));
//   };

//   const formatDateTaskModal = (date) => {
//     if (!date) return "Select Due Date";
//     const options = { month: "2-digit", day: "2-digit", year: "numeric" };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     if (
//       name === "highpriority" ||
//       name === "moderatepriority" ||
//       name === "lowpriority"
//     ) {
//       setTaskData({
//         ...taskData,
//         priority: value
//       });
//     } else if (name === "title") {
//       setTaskData({
//         ...taskData,
//         title: value
//       });
//       console.log(name);
//     } else if (name === "dueDate") {
//       setTaskData({
//         ...taskData,
//         dueDate: new Date(value)
//       });
//       console.log(dueDate);
//     } else if (name === "assign") {
//       setTaskData({
//         ...taskData,
//         assign: value
//       });
//       console.log(assign);
//     }

//     console.log(value);
//   };

//   console.log(taskData);

//   //Create card in database (save cards)
//   const handleSaveCard = async (e) => {
//     e.preventDefault();
//     const data = { ...taskData };
//     console.log("Data being sent:", data);
//     console.log("Checklist before sending:", taskData.checklist);

//     if (
//       !taskData.title ||
//       !taskData.priority ||
//       taskData.checklist.length === 0
//     ) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     // Check for empty checklist items
//     if (taskData.checklist.some((item) => item.text.trim() === "")) {
//       alert("Please fill in all checklist items");
//       return;
//     }
//     try {
//       const response = await createTask({ data });
//       console.log("Response from server:", response);

//       if (response.status === 200) {
//         toast.success("Task created successfully");
//         setTaskData({
//           title: "",
//           priority: "",
//           assign: "",
//           checklist: [{ text: "", completed: false }],
//           dueDate: ""
//         });

//         fetchTasks();
//         setIsModalOpen(false);
//       } else {
//         toast.error("Task creation failed");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   //code for checklist
//   // Handle checklist change for each item
//   const handleChecklistChange = (index, value) => {
//     const updatedChecklist = [...taskData.checklist];
//     updatedChecklist[index] = { ...updatedChecklist[index], text: value };
//     setTaskData((prevTaskData) => ({
//       ...prevTaskData,
//       checklist: updatedChecklist
//     }));
//   };

//   // Handle checklist completion toggle
//   const handleChecklistCompletionChange = (index) => {
//     const updatedChecklist = taskData.checklist.map((item, id) =>
//       id === index ? { ...item, completed: !item.completed } : item
//     );
//     setTaskData({
//       ...taskData,
//       checklist: updatedChecklist
//     });
//   };

//   // Add new checklist item
//   const handleAddChecklistItem = () => {
//     setTaskData({
//       ...taskData,
//       checklist: [...taskData.checklist, { text: "", completed: false }]
//     });
//   };

//   // Delete checklist item
//   const handleDeleteChecklistItem = (index) => {
//     const updatedChecklist = taskData.checklist.filter(
//       (_, idx) => idx !== index
//     );
//     setTaskData({
//       ...taskData,
//       checklist: updatedChecklist
//     });
//   };

//   ////////-------------------------------------------------------------///////

//   //For edit the tasks
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditState((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // Priority
//   const handleEditPriorityChange = (value) => {
//     setEditState((prevData) => ({
//       ...prevData,
//       priority: value
//     }));
//   };

//   // Date
//   const handleEditDate = (event) => {
//     const newDate = event.target.value;
//     setSelectedDate(newDate);
//     setEditState((prev) => ({ ...prev, dueDate: newDate }));
//     setShowCalendar(false);
//   };

//   const handleEdit = async (id) => {
//     console.log(id);
//     setShowEditTaskBar(true);
//     setEditTaskId(id);
//     console.log("id", editTaskId);
//     try {
//       const response = await getTasks(editTaskId);
//       if (response.status === 200) {
//         setEditState(response.data);
//         console.log("editState", editState);
//       } else {
//         console.error("Error fetching tasks:", response.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleUpdateEditedTask = async (e) => {
//     e.preventDefault();
//     const data = { ...editState };
//     console.log("data", data);
//     try {
//       const response = await updateTask(editTaskId, data);
//       if (response.status === 200) {
//         toast.success("Task Edited Successfully");
//         fetchTasks();
//         setShowEditTaskBar(false);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Task Edit failed");
//     }
//   };

//   return (
//     <>
//       <div className="taskboard-board">
//         {/* Backlog Column */}
//         <div className="board-column backlog">
//           <h3>Backlog</h3>
//           <img src={taskImg} alt="Backlog" className="corner-icon" />

//           {backlogTasks.map((task) => (
//             <div key={task._id} className="task-card">
//               {/* Priority and User Avatar Section */}
//               <div className="header-row">
//                 <div className="priority-section">
//                   <div className="priority">
//                     <span
//                       className={`dot ${
//                         task.priority === "High"
//                           ? "high-priority"
//                           : task.priority === "Moderate"
//                           ? "moderate-priority"
//                           : "low-priority"
//                       }`}
//                     ></span>
//                     <span className="priority-label">
//                       {task.priority.toUpperCase()} PRIORITY
//                     </span>
//                   </div>
//                 </div>
//                 {/* User Badge Section */}
//                 <span className="user-badge">
//                   {task.assign ? task.assign[0].toUpperCase() : "?"}
//                 </span>

//                 {/* Menu Icon */}
//                 <div className="menu-icon" onClick={() => toggleMenu(task._id)}>
//                   <img src={menu} alt="menu icon" />
//                 </div>
//               </div>

//               {/* Show menu only for the task with the matching ID */}
//               {menuTaskId === task._id && (
//                 <div className="popup-menu">
//                   {user && user.id === task.creator && (
//                     <>
//                       <button onClick={() => handleEdit(task._id)}>Edit</button>
//                       <button>Share</button>
//                       <button
//                         className="delete-button"
//                         onClick={() => {
//                           setTaskToDelete(task._id);
//                           setIsDeleteConfirmationVisible(true);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Task Title */}
//               <h3 className="data-title">{task.title}</h3>

//               {/* Checklist Section */}
//               <div className="checklist">
//                 <div className="checklist-header">
//                   <p>
//                     Checklist (
//                     {task.checklist.filter((item) => item.completed).length}/
//                     {task.checklist.length})
//                   </p>
//                   <img
//                     src={checklistTaskId === task._id ? upArrow : downArrow}
//                     alt="toggle checklist"
//                     onClick={() => toggleChecklist(task._id)}
//                     className="arrow-icon"
//                   />
//                 </div>

//                 {checklistTaskId === task._id && (
//                   <div className="checklist-items">
//                     {task.checklist.map((item, index) => (
//                       <div key={index} className="checklist-item">
//                         <input
//                           type="checkbox"
//                           checked={item.completed}
//                           className="checkbox"
//                           readOnly
//                         />
//                         <span>{item.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="action-buttons">
//                 <span
//                   className={`due-date ${
//                     task.status === "done"
//                       ? "done-due-date"
//                       : new Date(task.dueDate) < new Date()
//                       ? "overdue-due-date"
//                       : "upcoming-due-date"
//                   }`}
//                 >
//                   {formatDate(task.dueDate)}
//                 </span>
//                 <div className="status-buttons">
//                   {/* Conditionally render the Backlog button */}
//                   {task.category !== "Backlog" && (
//                     <button
//                       onClick={() => handleUpdateCategory(task._id, "Backlog")}
//                     >
//                       BACKLOG
//                     </button>
//                   )}

//                   <button
//                     onClick={() =>
//                       handleUpdateCategory(task._id, "In Progress")
//                     }
//                   >
//                     PROGRESS
//                   </button>

//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "Done")}
//                   >
//                     DONE
//                   </button>

//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "To-do")}
//                   >
//                     TO DO
//                   </button>
//                 </div>
//               </div>

//               {/* Delete Confirmation Popup */}
//               {isDeleteConfirmationVisible && (
//                 <div className="confirmation-popup">
//                   <div className="popup-content">
//                     <h4>Are you sure you want to Delete?</h4>
//                     <div className="popup-buttons">
//                       <button
//                         className="confirm-button"
//                         onClick={() => handleDelete(taskToDelete)}
//                       >
//                         Yes, Delete
//                       </button>
//                       <button
//                         onClick={() => setIsDeleteConfirmationVisible(false)}
//                         className="cancel-button"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         {/* To-do Column */}
//         <div className="board-column todo">
//           <h3>To do</h3>
//           <button className="plus-icon" onClick={openModal}>
//             +
//           </button>
//           <img src={taskImg} alt="To do" className="corner-icon" />
//           {todoTasks.map((task) => (
//             //To create assigned card in to do state

//             <div key={task._id} className="task-card">
//               {/* Priority and User Avatar Section */}
//               <div className="header-row">
//                 <div className="priority-section">
//                   <div className="priority">
//                     <span
//                       className={`dot ${
//                         task.priority === "High"
//                           ? "high-priority"
//                           : task.priority === "Moderate"
//                           ? "moderate-priority"
//                           : "low-priority"
//                       }`}
//                     ></span>
//                     <span className="priority-label">
//                       {task.priority.toUpperCase()} PRIORITY
//                     </span>
//                   </div>
//                 </div>
//                 {/* User Badge Section */}
//                 <span className="user-badge">
//                   {task.assign ? task.assign[0].toUpperCase() : "?"}
//                 </span>

//                 {/* Menu Icon */}
//                 <div className="menu-icon" onClick={() => toggleMenu(task._id)}>
//                   <img src={menu} alt="menu icon" />
//                 </div>
//               </div>
//               {/* Show menu only for the task with the matching ID */}
//               {menuTaskId === task._id && (
//                 <div className="popup-menu">
//                   {user && user.id === task.creator && (
//                     <>
//                       <button onClick={() => handleEdit(task._id)}>Edit</button>
//                       <button>Share</button>
//                       <button
//                         className="delete-button"
//                         onClick={() => {
//                           setTaskToDelete(task._id);
//                           setIsDeleteConfirmationVisible(true);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Task Title */}
//               <h3 className="data-title">{task.title}</h3>

//               {/* Checklist Section */}
//               <div className="checklist">
//                 <div className="checklist-header">
//                   <p>
//                     Checklist (
//                     {task.checklist.filter((item) => item.completed).length}/
//                     {task.checklist.length})
//                   </p>
//                   <img
//                     src={checklistTaskId === task._id ? upArrow : downArrow}
//                     alt="toggle checklist"
//                     onClick={() => toggleChecklist(task._id)}
//                     className="arrow-icon"
//                   />
//                 </div>

//                 {checklistTaskId === task._id && (
//                   <div className="checklist-items">
//                     {task.checklist.map((item, index) => (
//                       <div key={index} className="checklist-item">
//                         <input
//                           type="checkbox"
//                           checked={item.completed}
//                           className="checkbox"
//                           readOnly
//                         />
//                         <span>{item.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="action-buttons">
//                 <span
//                   className={`due-date ${
//                     task.status === "done"
//                       ? "done-due-date"
//                       : new Date(task.dueDate) < new Date()
//                       ? "overdue-due-date"
//                       : "upcoming-due-date"
//                   }`}
//                 >
//                   {formatDate(task.dueDate)}
//                 </span>
//                 <div className="status-buttons">
//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "Backlog")}
//                   >
//                     BACKLOG
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleUpdateCategory(task._id, "In Progress")
//                     }
//                   >
//                     PROGRESS
//                   </button>
//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "Done")}
//                   >
//                     DONE
//                   </button>
//                   {/* Conditionally render the To-do button */}
//                   {task.category !== "To-do" && (
//                     <button
//                       onClick={() => handleUpdateCategory(task._id, "To-do")}
//                     >
//                       TO DO
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Delete Confirmation Popup */}
//               {isDeleteConfirmationVisible && (
//                 <div className="confirmation-popup">
//                   <div className="popup-content">
//                     <h4>Are you sure you want to Delete?</h4>
//                     <div className="popup-buttons">
//                       <button
//                         className="confirm-button"
//                         onClick={() => handleDelete(taskToDelete)}
//                       >
//                         Yes, Delete
//                       </button>
//                       <button
//                         onClick={() => setIsDeleteConfirmationVisible(false)}
//                         className="cancel-button"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         {/* In-progress Column */}
//         <div className="board-column in-progress">
//           <h3>In Progress</h3>
//           <img src={taskImg} alt="In Progress" className="corner-icon" />
//           {inProgressTasks.map((task) => (
//             //To create assigned card in progress state

//             <div key={task._id} className="task-card">
//               {/* Priority and User Avatar Section */}
//               <div className="header-row">
//                 <div className="priority-section">
//                   <div classname="priority">
//                     <span
//                       className={`dot ${
//                         task.priority === "High"
//                           ? "high-priority"
//                           : task.priority === "Moderate"
//                           ? "moderate-priority"
//                           : "low-priority"
//                       }`}
//                     ></span>
//                     <span className="priority-label">
//                       {task.priority.toUpperCase()} PRIORITY
//                     </span>
//                   </div>
//                 </div>
//                 {/* User Badge Section */}
//                 <span className="user-badge">
//                   {task.assign ? task.assign[0].toUpperCase() : "?"}
//                 </span>

//                 {/* Menu Icon */}
//                 <div className="menu-icon" onClick={() => toggleMenu(task._id)}>
//                   <img src={menu} alt="menu icon" />
//                 </div>
//               </div>
//               {/* Show menu only for the task with the matching ID */}
//               {menuTaskId === task._id && (
//                 <div className="popup-menu">
//                   {user && user.id === task.creator && (
//                     <>
//                       <button onClick={() => handleEdit(task._id)}>Edit</button>
//                       <button>Share</button>
//                       <button
//                         className="delete-button"
//                         onClick={() => {
//                           setTaskToDelete(task._id);
//                           setIsDeleteConfirmationVisible(true);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Task Title */}
//               <h3 className="data-title">{task.title}</h3>

//               {/* Checklist Section */}
//               <div className="checklist">
//                 <div className="checklist-header">
//                   <p>
//                     Checklist (
//                     {task.checklist.filter((item) => item.completed).length}/
//                     {task.checklist.length})
//                   </p>
//                   <img
//                     src={checklistTaskId === task._id ? upArrow : downArrow}
//                     alt="toggle checklist"
//                     onClick={() => toggleChecklist(task._id)}
//                     className="arrow-icon"
//                   />
//                 </div>

//                 {checklistTaskId === task._id && (
//                   <div className="checklist-items">
//                     {task.checklist.map((item, index) => (
//                       <div key={index} className="checklist-item">
//                         <input
//                           type="checkbox"
//                           checked={item.completed}
//                           className="checkbox"
//                           readOnly
//                         />
//                         <span>{item.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="action-buttons">
//                 <span
//                   className={`due-date ${
//                     task.status === "done"
//                       ? "done-due-date"
//                       : new Date(task.dueDate) < new Date()
//                       ? "overdue-due-date"
//                       : "upcoming-due-date"
//                   }`}
//                 >
//                   {formatDate(task.dueDate)}
//                 </span>
//                 <div className="status-buttons">
//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "Backlog")}
//                   >
//                     BACKLOG
//                   </button>
//                   {/* Conditionally render the In Progress button */}
//                   {task.category !== "In Progress" && (
//                     <button
//                       onClick={() =>
//                         handleUpdateCategory(task._id, "In Progress")
//                       }
//                     >
//                       PROGRESS
//                     </button>
//                   )}

//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "Done")}
//                   >
//                     DONE
//                   </button>

//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "To-do")}
//                   >
//                     TO DO
//                   </button>
//                 </div>
//               </div>

//               {/* Delete Confirmation Popup */}
//               {isDeleteConfirmationVisible && (
//                 <div className="confirmation-popup">
//                   <div className="popup-content">
//                     <h4>Are you sure you want to Delete?</h4>
//                     <div className="popup-buttons">
//                       <button
//                         className="confirm-button"
//                         onClick={() => handleDelete(taskToDelete)}
//                       >
//                         Yes, Delete
//                       </button>
//                       <button
//                         onClick={() => setIsDeleteConfirmationVisible(false)}
//                         className="cancel-button"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         {/* Done Column */}
//         <div className="board-column done">
//           <h3>Done</h3>
//           <img src={taskImg} alt="Done" className="corner-icon" />
//           {doneTasks.map((task) => (
//             //To create assigned card in done state
//             <div key={task._id} className="task-card">
//               {/* Priority and User Avatar Section */}
//               <div className="header-row">
//                 <div className="priority-section">
//                   <div className="priority">
//                     <span
//                       className={`dot ${
//                         task.priority === "High"
//                           ? "high-priority"
//                           : task.priority === "Moderate"
//                           ? "moderate-priority"
//                           : "low-priority"
//                       }`}
//                     ></span>
//                     <span className="priority-label">
//                       {task.priority.toUpperCase()} PRIORITY
//                     </span>
//                   </div>
//                 </div>
//                 {/* User Badge Section */}
//                 <span className="user-badge">
//                   {task.assign ? task.assign[0].toUpperCase() : "?"}
//                 </span>

//                 {/* Menu Icon */}
//                 <div className="menu-icon" onClick={() => toggleMenu(task._id)}>
//                   <img src={menu} alt="menu icon" />
//                 </div>
//               </div>
//               {/* Show menu only for the task  */}
//               {menuTaskId === task._id && (
//                 <div className="popup-menu">
//                   {user && user.id === task.creator && (
//                     <>
//                       <button onClick={() => handleEdit(task._id)}>Edit</button>
//                       <button>Share</button>
//                       <button
//                         className="delete-button"
//                         onClick={() => {
//                           setTaskToDelete(task._id);
//                           setIsDeleteConfirmationVisible(true);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Task Title */}
//               <h3 className="data-title">{task.title}</h3>

//               {/* Checklist Section */}
//               <div className="checklist">
//                 <div className="checklist-header">
//                   <p>
//                     Checklist (
//                     {task.checklist.filter((item) => item.completed).length}/
//                     {task.checklist.length})
//                   </p>
//                   <img
//                     src={checklistTaskId === task._id ? upArrow : downArrow}
//                     alt="toggle checklist"
//                     onClick={() => toggleChecklist(task._id)}
//                     className="arrow-icon"
//                   />
//                 </div>

//                 {checklistTaskId === task._id && (
//                   <div className="checklist-items">
//                     {task.checklist.map((item, index) => (
//                       <div key={index} className="checklist-item">
//                         <input
//                           type="checkbox"
//                           checked={item.completed}
//                           className="checkbox"
//                           readOnly
//                         />
//                         <span>{item.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="action-buttons">
//                 <span
//                   className={`due-date ${
//                     task.status === "done"
//                       ? "done-due-date"
//                       : new Date(task.dueDate) < new Date()
//                       ? "overdue-due-date"
//                       : "upcoming-due-date"
//                   }`}
//                 >
//                   {formatDate(task.dueDate)}
//                 </span>
//                 <div className="status-buttons">
//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "Backlog")}
//                   >
//                     BACKLOG
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleUpdateCategory(task._id, "In Progress")
//                     }
//                   >
//                     PROGRESS
//                   </button>
//                   {/* Conditionally render the Done button */}
//                   {task.category !== "Done" && (
//                     <button
//                       onClick={() => handleUpdateCategory(task._id, "Done")}
//                     >
//                       DONE
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleUpdateCategory(task._id, "To-do")}
//                   >
//                     TO DO
//                   </button>
//                 </div>
//               </div>

//               {/* Delete Confirmation Popup */}
//               {isDeleteConfirmationVisible && (
//                 <div className="confirmation-popup">
//                   <div className="popup-content">
//                     <h4>Are you sure you want to Delete?</h4>
//                     <div className="popup-buttons">
//                       <button
//                         className="confirm-button"
//                         onClick={() => handleDelete(taskToDelete)}
//                       >
//                         Yes, Delete
//                       </button>
//                       <button
//                         onClick={() => setIsDeleteConfirmationVisible(false)}
//                         className="cancel-button"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Task Modal */}
//         {isModalOpen && (
//           <div className="modal-overlay">
//             <div className="task-modal">
//               <form onSubmit={handleSaveCard}>
//                 {/* Title Input */}
//                 <div className="form-group">
//                   <label htmlFor="title">
//                     Title <span className="asterisk">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={taskData.title}
//                     onChange={handleOnChange}
//                     placeholder="Enter Task Title"
//                     required
//                   />
//                 </div>

//                 {/* Priority Selection */}
//                 <div className="priority-selector">
//                   <label className="priority-label">
//                     Select Priority <span className="asterisk">*</span>
//                   </label>
//                   <div className="priority-options">
//                     <button
//                       type="button"
//                       value="high"
//                       name="highpriority"
//                       className={`priority-button high ${
//                         priorities === "high" ? "active" : ""
//                       }`}
//                       onClick={handleOnChange}
//                     >
//                       <span className="dot high-dot"></span> HIGH PRIORITY
//                     </button>
//                     <button
//                       type="button"
//                       name="moderatepriority"
//                       value="moderate"
//                       className={`priority-button moderate ${
//                         priorities === "moderate" ? "active" : ""
//                       }`}
//                       onClick={handleOnChange}
//                     >
//                       <span className="dot moderate-dot"></span> MODERATE
//                       PRIORITY
//                     </button>
//                     <button
//                       type="button"
//                       name="lowpriority"
//                       value="low"
//                       className={`priority-button low ${
//                         priorities === "low" ? "active" : ""
//                       }`}
//                       onClick={handleOnChange}
//                     >
//                       <span className="dot low-dot"></span> LOW PRIORITY
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   {/* Assignee Field */}
//                   {taskData.checklist.length > 0 && (
//                     <div>
//                       <label className="assignee">
//                         Assignee
//                         <input
//                           type="text"
//                           name="assign"
//                           value={taskData.assign}
//                           className="assignee-input"
//                           onChange={handleOnChange}
//                           placeholder="Add Assignee"
//                         />
//                       </label>
//                     </div>
//                   )}

//                   <label>
//                     Checklist (
//                     {taskData.checklist.filter((item) => item.completed).length}
//                     /{taskData.checklist.length}){" "}
//                     <span className="asterisk">*</span>
//                   </label>

//                   {/* Checklist items */}
//                   {taskData.checklist.map((item, index) => (
//                     <div key={index} className="checklist-item">
//                       <input
//                         type="checkbox"
//                         name="checklist"
//                         checked={item.completed}
//                         onChange={() => handleChecklistCompletionChange(index)}
//                       />
//                       <input
//                         type="text"
//                         value={item.text}
//                         onChange={(e) =>
//                           handleChecklistChange(index, e.target.value)
//                         }
//                         placeholder="Add Checklist Item"
//                       />
//                       <img
//                         src={deleteButton}
//                         alt="Delete"
//                         className="delete-icon"
//                         onClick={() => handleDeleteChecklistItem(index)}
//                       />
//                     </div>
//                   ))}

//                   <button
//                     type="button"
//                     className="add-checklist"
//                     onClick={handleAddChecklistItem}
//                   >
//                     + Add New
//                   </button>
//                 </div>

//                 {/* Footer Buttons */}
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     name="dueDate"
//                     className="select-due-date"
//                     onClick={toggleCalendar}
//                   >
//                     {formatDateTaskModal(selectedDate)}
//                   </button>

//                   {/* Show the calendar  */}
//                   {showCalendar && (
//                     <div className="calendar-popup">
//                       <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={handleDateChange}
//                         className="date-input"
//                       />
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="save-btn"
//                     onClick={handleSaveCard}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Edit Task  */}
//         {showEditTaskBar && (
//           <div className="edit-task-popup">
//             <div className="popup-content">
//               <label>Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={editState.title}
//                 onChange={handleEditChange}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default TaskBoard;

// // Contain Task.jsx code
// import React, { useState } from 'react';
// import Sidebar from './SideBar'; // Import the Sidebar component
// import './Task.css';
// import { TaskCard } from './TaskCard.jsx'; 
// import addButton from '../assets/Add.png';
// import collapseButton from '../assets/collapse.png';
// import redEllipse from '../assets/red.png';
// import blueEllipse from '../assets/blue.png';
// import greenEllipse from '../assets/green.png';

// export const Task = () => {
//     const [showTaskBar, setShowTaskBar] = useState(false);
//     const [checklist, setChecklist] = useState([]);
//     const [dueDate, setDueDate] = useState("");
//     const [assignee, setAssignee] = useState("");
//     const [taskData, setTaskData] = useState({
//         title: null,
//         priority: null,
//         assignee: null,
//         checklist: null,
//         dueDate: null
//       });
//    //states for calendar
//    const [showCalendar, setShowCalendar] = useState(false);
//    const [selectedDate, setSelectedDate] = useState("");
 
//    console.log(setDueDate);
 
//    const toggleCalendar = () => {
//      setShowCalendar(!showCalendar);
//    };
 
//    const handleDateChange = (event) => {
//      const newDate = event.target.value;
//      setSelectedDate(newDate);
//      setShowCalendar(false);
//    };
 
//    const formatDate = (date) => {
//      if (!date) return "Select Due Date";
//      const options = { year: "numeric", month: "long", day: "numeric" };
//      return new Date(date).toLocaleDateString(undefined, options);
//    };
 
//    const handleAddChecklistItem = () => {
//      setChecklist([...checklist, { text: "", completed: false }]);
//    };
 
//    const handleChecklistChange = (index, value) => {
//      const newChecklist = [...checklist];
//      newChecklist[index].text = value;
//      setChecklist(newChecklist);
//    };
 
//    const handleChecklistCompletionChange = (index) => {
//      const newChecklist = [...checklist];
//      newChecklist[index].completed = !newChecklist[index].completed;
//      setChecklist(newChecklist);
//    };
 
//    const handleDeleteChecklistItem = (index) => {
//      const newChecklist = checklist.filter((_, i) => i !== index);
//      setChecklist(newChecklist);
//    };
 
//    const handleSave = () => {
//      if (!title || !priorities || checklist.length === 0) {
//        alert("Please fill in all required fields");
//        return;
//      }
 
//      const task = {
//        title,
//        priorities,
//        checklist,
//        dueDate: selectedDate || dueDate,
//        assignee
//      };
 
//      onSave(task);
//      onClose();
//    };
 
//    const handleOnChange = (e) => {
//      if (
//        e.target.name === "highpriority" ||
//        e.target.name === "moderatepriority" ||
//        e.target.name === "lowpriority" ||
//        e.target
//      ) {
//        setTaskData({
//          ...taskData,
//          priority: e.target.value
//        });
//      } else if (e.target.name === "title") {
//        setTaskData({
//          ...taskData,
//          name: e.target.value
//        });
//        console.log(e.target.name);
//      }
 
//      console.log(e.target.value);
//    };
 
//    console.log(taskData);
 
//    const handleSaveCard = async (e) => {
//      e.preventDefault();
 
//      if (
//        !taskData.title ||
//        !taskData.priority ||
//        !taskData.checklist ||
//        taskData.dueDate
//      ) {
//        return;
//      }
//      try {
//        const { title, priority, checklist, dueDate } = taskData;
//        const response = await createTask({
//          title,
//          priority,
//          checklist,
//          dueDate
//        });
//        console.log(response);
//        if (response.status === 200) {
//          toast.success("User created successfully");
//        }
//      } catch (error) {
//        toast.error(error.message);
//      }
//    };

//    const handleCloseModal = () =>{
//     setShowTaskBar(false);

//    }

//     return (
//         <div className="dashboard">
//             <Sidebar />
//             <div className="board">
//                 <header className="dashboard-header">
//                     <h1>Welcome! Kumar</h1>
//                     <p>12th Jan, 2024</p>
//                 </header>
//                 <div className="task-columns">
//                     <div className="column">
//                         <h2>Backlog</h2>
//                     </div>
//                     <div className="column">
//                         <div className="add-task">
//                             <h2>To do</h2>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//                                 <img src={addButton} alt="Add"  onClick={()=>setShowTaskBar(true)}/>
//                                 <img src={collapseButton} alt="Collapse" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="column">
//                         <h2>In progress</h2>
//                     </div>
//                     <div className="column">
//                         <h2>Done</h2>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal Component */}
//             <TaskCard isOpen={showTaskBar} onClose={handleCloseModal}>
//             <form onSubmit={handleSaveCard}>
//                 <p>Title <span style={{ color:"red"}}>*</span></p>
//                 <input 
//                 type="text" 
//                 placeholder='Enter Task Title' 
//                 id="title"
//                 name="title"
//                 value={taskData.title}
//                 // onChange={(e) => setTitle(e.target.value)}
//                 onChange={handleOnChange}
//                 required
//                 style={{
//                     padding:"4px",
//                     width:"360px"
//                 }}/>
//                 <p>Select Priority
//                     <span style={{ color:"red"}}>*</span>
//                     <button 
//                     className="modes"
//                     type="button"
//                     value="high"
//                     name="highpriority"
//                     onClick={handleOnChange}
//                     > <span style={{display:"flex", justifyContent:"space-between",paddingRight:'4px'}}><img src={redEllipse} alt="redEllipse" /></span>HIGH PRIORITY</button>
//                     <button 
//                     className="modes"
//                     type="button"
//                     value="high"
//                     name="highpriority"
//                     onClick={handleOnChange}
//                     > <span><img src={blueEllipse} alt="redEllipse" /></span>MODERATE PRIORITY</button>
//                     <button 
//                     className="modes"
//                     type="button"
//                     value="high"
//                     name="highpriority"
//                     onClick={handleOnChange}
//                     > <span><img src={greenEllipse} alt="redEllipse" />  </span>LOW PRIORITY</button>
//                 </p>
//                 {/* Checklist */}
//                 <div className="form-group">
//                     {/* show assignee on click of button */}
//                     {checklist.length > 0 && (
//                     <div>
//                         <label className="assignee">
//                         Assignee
//                         <input
//                             type="text"
//                             name="checklist"
//                             value={assignee}
//                             className="assignee-input"
//                             onChange={(e) => setAssignee(e.target.value)}
//                             placeholder="Add Assignee"
//                         />
//                         </label>
//                     </div>
//                     )}

//                     <label>
//                         Checklist (0/{checklist.length}){" "}
//                         <span className="asterisk">*</span>
//                     </label>

//                     {checklist.map((item, index) => (
//                     <div key={index} className="checklist-item">
//                         <input
//                         type="checkbox"
//                         checked={item.completed}
//                         onChange={() => handleChecklistCompletionChange(index)}
//                         />
//                         <input
//                         type="text"
//                         value={item.text}
//                         onChange={(e) => handleChecklistChange(index, e.target.value)}
//                         placeholder="Add Checklist Item"
//                         />
//                         <img
//                         // src={deleteButton}
//                         alt="Delete"
//                         className="delete-icon"
//                         onClick={() => handleDeleteChecklistItem(index)}
//                         />
//                     </div>
//                     ))}
//                        <button
//                             type="button"
//                             className="add-checklist"
//                             onClick={handleAddChecklistItem}
//                             >
//                             + Add New
//                         </button>
//                 </div>

//                   {/* Footer Buttons */}
//           <div className="modal-footer">
//             <button
//               type="button"
//               name="date"
//               className="select-due-date"
//               onClick={toggleCalendar}
//             >
//               {formatDate(selectedDate)}
//             </button>

//             {/* Show the calendar  */}
//             {showCalendar && (
//               <div className="calendar-popup">
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={handleDateChange}
//                   className="date-input"
//                 />
//               </div>
//             )}

//             <button type="button" className="cancel-btn" onClick={handleCloseModal}>
//               Cancel
//             </button>
//             <button type="submit" className="save-btn" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//             </form>    
//             </TaskCard>
//         </div>
//     );
// };




// // import React from 'react';
// // import Sidebar from './SideBar'; // Import the Sidebar component
// // import './Task.css';
// // import Modal from './TaskCard.jsx';
// // import addButton from '../assets/Add.png'
// // import collapseButton from '../assets/collapse.png'
// // import { useState } from 'react';


// // export const Task = () => {

// //     const [showTaskBar, setShowTaskBar] = useState(false);

// //     const handleAddTask = () => {
// //         console.log("Add Task button clicked")
// //         setShowTaskBar(true);
// //     }

// //     return (
// //         <div className="dashboard">
// //             <Sidebar />
// //             <div className="board">
// //                 <header className="dashboard-header">
// //                     <h1>Welcome! Kumar</h1>
// //                     <p>12th Jan, 2024</p>
// //                 </header>
// //                 <div className="task-columns">
// //                     {/* You can create a separate component for the Task Board columns if needed */}
// //                     <div className="column">
// //                         <h2>Backlog</h2>
// //                         {/* Add task cards */}
// //                         {/* <div className="task-card">
// //                             <div className={`priority ${task.priority.toLowerCase()}`}>
// //                                 {task.priority}
// //                             </div>
// //                             <h3>{task.title}</h3>
// //                             <p>Checklist: {task.checklist}</p>
// //                             <div className="task-dates">
// //                                 <p>{task.date}</p>
// //                                 <p>{task.status}</p>
// //                             </div>
// //                         </div> */}
// //                         {/* <TaskCard /> */}
// //                     </div>
// //                     <div className="column">
// //                         <div className="add-task">
// //                             <h2>To do</h2>
// //                             <div style={{
// //                                 display: 'flex',
// //                                 alignItems: 'center',
// //                                 gap: '5px'
// //                             }}>
// //                                 <img src={addButton} alt="Add" onClick={handleAddTask} />
// //                                 <img src={collapseButton} alt="Collapse" />
// //                             </div>

// //                         </div>

// //                     </div>
// //                     <div className="column">
// //                         <h2>In progress</h2>
                
// //                     </div>
// //                     <div className="column">
// //                         <h2>Done</h2>
// //                     </div>
// //                 </div>
// //             </div>
// //             {/* Modal Component */}
// //             <Modal isOpen={showTaskBar} onClose={handleCloseModal}>
// //                 <h2>Add New Task</h2>
// //                 <form>
// //                     <input type="text" placeholder="Task Title" required />
// //                     <textarea placeholder="Task Description" required></textarea>
// //                     <button type="submit">Add Task</button>
// //                 </form>
// //                 <button onClick={handleCloseModal}>Close</button>
// //             </Modal>
// //         </div>
// //     );
// // };





// // import React, { useEffect, useState } from 'react';
// // import { createTask, getTasks } from '../services/task'; // Adjust the import path as necessary

// // export const Task = () => {
// //     const [tasks, setTasks] = useState([]);
// //     const [taskData, setTaskData] = useState({ title: '', description: '' });
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     const fetchTasks = async () => {
// //         try {
// //             const response = await getTasks({});
// //             setTasks(response.data);
// //         } catch (err) {
// //             setError(err.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchTasks();
// //     }, []);

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setTaskData({ ...taskData, [name]: value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await createTask({ data: taskData });
// //             fetchTasks(); // Refresh the task list
// //             setTaskData({ title: '', description: '' }); // Clear form
// //         } catch (err) {
// //             setError(err.message);
// //         }
// //     };

// //     if (loading) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div>
// //             <h1>Task Manager</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <input
// //                     type="text"
// //                     name="title"
// //                     placeholder="Task Title"
// //                     value={taskData.title}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <textarea
// //                     name="description"
// //                     placeholder="Task Description"
// //                     value={taskData.description}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <button type="submit">Create Task</button>
// //             </form>
// //             {error && <p style={{ color: 'red' }}>{error}</p>}
// //             <h2>Tasks</h2>
// //             <ul>
// //                 {tasks.map(task => (
// //                     <li key={task.id}>
// //                         <h3>{task.title}</h3>
// //                         <p>{task.description}</p>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };




// // // // catch the id from the URL and fetch the job data from the server
// // // import { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { getTasks } from '../services/task';

// // // export const Task = () => {
// // //     const { id } = useParams(); //useParams gets you the url details
// // //     const [task, setTask] = useState({});
// // //     const [loading, setLoading] = useState(true);
// // //     useEffect(() => {
// // //         const fetchTask = async () => {
// // //             setLoading(true);
// // //             const response = await getTasks({ id });
// // //             if (response.status === 200) {
// // //                 setTask(response.data);
// // //             }
// // //             setLoading(false);
// // //         }
// // //         fetchTask();
// // //     }, [])
// // //     return (
// // //         <div>
// // //             {loading ? <h1>Loading...</h1> : (
// // //                 <div className="task-card">
// // //                     <h4>{task.title}</h4>
// // //                     <p>Priority: {task.priority}</p>
// // //                     <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
// // //                     <button onClick={() => updateStatus(task._id, 'in-progress')}>In Progress</button>
// // //                     <button onClick={() => updateStatus(task._id, 'done')}>Done</button>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     )
// // // }
