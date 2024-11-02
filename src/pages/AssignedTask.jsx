import { useEffect, useState, useContext } from 'react';
import { updateTask, getTasks, deleteTask } from '../services/task';
import toast from 'react-hot-toast';
import { verifyToken } from '../utils/auth';
import { useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export const AssignedTask = () => {
    const [tasks, setTasks] = useState([{
        title: "",
        category:"",
        priority: "",
        assign: "",
        checklist: [],
        dueDate: ""
    }]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(null);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const { state, setState } = useContext(AppContext);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await getTasks();
            if (response.status === 200) {
                setTasks(response.data);

                // Filter data based on category
                // const filteredData = response.data.reduce((acc, task) => {
                //     const { category } = task;
                //     if (!acc[category]) {
                //         acc[category] = [];
                //     }
                //     acc[category].push(task);
                //     return acc;
                // }, {});

                // setState(response.data) //Updating Context API 
            } else {
                console.error("Error fetching tasks:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchUser = async () => {
        const response = await verifyToken();
        if (response.status === 200) {
            setUser(response.data);
        }
        setAuthLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            const response = await deleteTask(taskId);
            if (response.status === 200) {
                toast.success('Task deleted successfully');
                fetchTasks(); // Fetch updated tasks list
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Task deletion failed');
        }
    };

    const handleModeToggle = (taskId) => {
        setEditMode(editMode === taskId ? null : taskId);
    };

    const handleUpdateCategory = async (id, newCategory) => {
        console.log(id)
        if (!id) {
            toast.error("Invalid task ID");
            return;
        }
        try {
            const response = await updateTask(id, { category: newCategory });
            if (response.status === 200) {
                toast.success('Task updated successfully');
                fetchTasks();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Task update failed');
        }
    };

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {tasks.map((task) => {
                        const priority = task.priority.toUpperCase();
                        let month = 'N/A';
                        let day = 'N/A';
                        if (task.dueDate) {
                            const dueDate = new Date(task.dueDate);
                            month = dueDate.toLocaleString(undefined, { month: 'long' });
                            day = dueDate.toLocaleString(undefined, { day: 'numeric' });
                        }

                        const isEditMode = editMode === task._id;

                        return (
                            <div key={task._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "4px"
                                }}>
                                    <div>
                                        <span>{`${priority} PRIORITY`}</span>
                                        <span> {task.assign || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => handleModeToggle(task._id)}>...</button>
                                        {isEditMode && (
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px",
                                                padding: "4px"
                                            }}>
                                                {/* Conditionally render delete button */}
                                                {user && user.id === task.creator && ( // Check if user is the creator
                                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                                )}
                                                <button onClick={() => handleEdit(task._id)}>Edit</button>
                                                <button>Share</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3>{task.title}</h3>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <button>{month.slice(0, 3)} {day}</button>
                                    <div style={{
                                        display: "flex",
                                        gap: "4px"
                                    }}>
                                        <button onClick={() => handleUpdateCategory(task._id, 'BACKLOG')}>BACKLOG</button>
                                        <button onClick={() => handleUpdateCategory(task._id, 'PROGRESS')}>PROGRESS</button>
                                        <button onClick={() => handleUpdateCategory(task._id, 'DONE')}>DONE</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};



// import { useEffect, useState } from 'react';
// import { updateTask, getTasks, deleteTask } from '../services/task';
// import toast from 'react-hot-toast';
// import { verifyToken } from '../utils/auth';
// import { useParams } from 'react-router-dom';

// export const AssignedTask = () => {
//     const { id } = useParams();
//     console.log(id)
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editMode, setEditMode] = useState(null);
//     const [user, setUser] = useState(null);
//     const [authLoading, setAuthLoading] = useState(true);

//     const fetchTasks = async () => {
//         setLoading(true);
//         try {
//             const response = await getTasks();
//             if (response.status === 200) {
//                 setTasks(response.data);
//             } else {
//                 console.error("Error fetching tasks:", response.status);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const handleModeToggle = (taskId) => {
//         setEditMode(editMode === taskId ? null : taskId);
//     };

//     useEffect(() => {
//         const fetchUser = async () => {
//             const response = await verifyToken();
//             if (response.status === 200) {
//                 setUser(response.data);
//             }
//             setAuthLoading(false);
//         }
//         fetchUser();
//     }, [])

//     console.log(user)

//     const handleDelete = async (id) => {
//         try {
//             const response = await deleteTask(id);
//             if (response.status === 200) {
//                 toast.success('Task deleted successfully');
//                 fetchTasks(); // Fetch updated tasks list
//             } else {
//                 toast.error(response.message);
//             }
//         } catch (error) {
//             toast.error('Task deletion failed');
//         }
//     };

//     const handleEdit = (taskId) => {
//         console.log(`Editing task with ID: ${taskId}`);
//     };

//     const handleUpdateCategory = async (id, newCategory) => {
//         console.log(id, newCategory)
//         try {
//             const response = await updateTask(id, { category: newCategory });
//             if (response.status === 200) {
//                 toast.success('Task updated successfully');
//                 fetchTasks();
//             } else {
//                 toast.error(response.message);
//             }
//         } catch (error) {
//             toast.error('Task update failed');
//         }
//     };

//     return (
//         <div>
//             <h1>All Tasks</h1>
//             {loading ? (
//                 <h1>Loading...</h1>
//             ) : (
//                 <div>
//                     {tasks.map((task) => {
//                         const priority = task.priority.toUpperCase();
//                         let month = 'N/A';
//                         let day = 'N/A';
//                         if (task.dueDate) {
//                             const dueDate = new Date(task.dueDate);
//                             month = dueDate.toLocaleString(undefined, { month: 'long' });
//                             day = dueDate.toLocaleString(undefined, { day: 'numeric' });
//                         }

//                         const isEditMode = editMode === task._id;

//                         return (
//                             // check this
//                             <div key={task._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
//                                 <div style={{
//                                     display: "flex",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     gap: "4px"
//                                 }}>
//                                     <div>
//                                         <span>{`${priority} PRIORITY`}</span>
//                                         <span> {task.assign || 'N/A'}</span>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => handleModeToggle(task._id)}>...</button>
//                                         {isEditMode && (
//                                             <div style={{
//                                                 display: "flex",
//                                                 flexDirection: "column",
//                                                 gap: "4px",
//                                                 padding: "4px"
//                                             }}>
//                                                 {/* <button onClick={() => handleDelete(task._id)}>Delete</button> */}
//                                                 {authLoading || user === null ? <button disabled>Delete</button> : <button onClick={() => handleDelete(task._id)}>Delete</button>}
//                                                 <button onClick={() => handleEdit(task._id)}>Edit</button>
//                                                 <button>Share</button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <h3>{task.title}</h3>
//                                 <div style={{
//                                     display: "flex",
//                                     justifyContent: "space-between",
//                                     alignItems: "center"
//                                 }}>
//                                     <button>{month.slice(0, 3)} {day}</button>
//                                     <div style={{
//                                         display: "flex",
//                                         gap: "4px"
//                                     }}>
//                                         {/* Check this */}
//                                         <button onClick={() => handleUpdateCategory(task._id, 'BACKLOG')}>BACKLOG</button>
//                                         <button onClick={() => handleUpdateCategory(task._id, 'PROGRESS')}>PROGRESS</button>
//                                         <button onClick={() => handleUpdateCategory(task._id, 'DONE')}>DONE</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };




// catch the id from the URL and fetch the task data from the server
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getTasks } from '../services/task';

// export const AssignedTask = () => {
//     // const { id } = useParams();
//     const [task, setTask] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTask = async () => {
//             setLoading(true);
//             try {
//                     const response = await getTasks();
//                     if (response.status === 200) {
//                         setTask(response.data);
//                     }
//                     else {
//                         console.error("Error fetching tasks:", response.status);
//                     }
//             } catch (error) {
//                 console.error("Error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchTask();
//     }, [])

//     console.log("task is", task)
//     return (
//         <div>
//             <h1>task</h1>
//             {loading ? <h1>Loading...</h1> : (
//                 <div>
//                     <h1>{task.title}</h1>
//                 </div>
//             )}
//         </div>
//     )
// }