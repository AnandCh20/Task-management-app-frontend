import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../component/SideBar.jsx';
import toast from "react-hot-toast";
import './Dashboard.css';
import { TaskCard } from './TaskCard.jsx';
import { useParams } from 'react-router-dom';
import { createTask, updateTask, getTasks, deleteTask } from '../services/task.js';
import addButton from '../assets/Add.png';
import collapseButton from '../assets/collapse.png';
import redEllipse from '../assets/red.png';
import blueEllipse from '../assets/blue.png';
import greenEllipse from '../assets/green.png';
import bin from '../assets/Delete.png';
import upArrow from '../assets/up.png';
import downArrow from '../assets/Down.png';
import { AppContext } from '../contexts/AppContext.jsx';
import { verifyToken } from '../utils/auth';
import MyDeleteModal from '../component/DeleteModal.jsx';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { id } = useParams();
    // const [fetchTask, setFetchTask] = useState(false);
    const [showTaskBar, setShowTaskBar] = useState(false);
    const [showEditTaskBar, setShowEditTaskBar] = useState(false);
    const [editState, setEditState] = useState([{
        title: "",
        category: "TODO",
        priority: "",
        assign: "",
        checklist: [{
            item: null, completed: null
        }],
        dueDate: ""
    }]);
    const [editTaskId, setEditTaskId] = useState('')
    const [taskData, setTaskData] = useState({
        title: "",
        category: "TODO",
        priority: "",
        assign: "",
        checklist: [{
            item: null, completed: null
        }],
        dueDate: ""
    });
    const [checklist, setChecklist] = useState([{
        item: '', completed: false
    }]);
    const [newChecklistItem, setNewChecklistItem] = useState('');
    const [isChecklistVisible, setisChecklistVisible] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const { state, setState } = useContext(AppContext);
    const [editMode, setEditMode] = useState(null);
    const [user, setUser] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { deleteId, setDeleteId, DeleteModal, setDeleteModal } = useContext(AppContext);

    /////////////////////////////// Current Date ///////////////////////////////////////
    useEffect(() => {
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        const date = new Date().toLocaleDateString('en-GB', options);
        const formattedDate = date.replace(/(\d+)/, '$1' + (date.includes('1') ? 'st' : date.includes('2') ? 'nd' : date.includes('3') ? 'rd' : 'th'));
        setCurrentDate(formattedDate);
    }, []);
    /////////////////////////////// CheckList Code /////////////////////////////////////
    const handleAddChecklistItem = () => {
        // Create an empty checklist item
        setChecklist(prev => [...prev, { item: '', completed: false }]);
    };

    const handleChecklistItemChange = (index, value) => {
        setChecklist(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, item: value } : item
            )
        );
    };

    const toggleChecklist = () => {
        setisChecklistVisible(!isChecklistVisible);
    };

    const handleDeleteChecklistItem = (index) => {
        setChecklist(checklist.filter((_, i) => i !== index));
        toast.success("Checklist item deleted successfully");
    };

    const toggleChecklistItem = (index) => {
        setChecklist(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item
            )
        );
    };
    ///////////////////////////////////////////////////////////////////////////////////////
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    console.log(showCalendar)

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setShowCalendar(false);
    };

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : 'Select a date';
    };
    ////////////////////////////////////////////////////////////////////////////
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePriorityChange = (value) => {
        setTaskData((prevData) => ({
            ...prevData,
            priority: value,
        }));
    };

    /////////////////////// Task Modal Save Card /////////////////////////////////
    const handleSaveCard = async (e) => {
        e.preventDefault();
        const data = { ...taskData, checklist: checklist };
        // const data = { ...taskData};
        console.log("data", data)

        if (!taskData.title || !taskData.priority || checklist.length === 0 || !taskData.dueDate) {
            toast.error("Please fill in all required fields");
            return;
        }
        try {
            const response = await createTask({ data });
            if (response.status === 200) {
                toast.success("Task created successfully");
                setShowTaskBar(false);
                setTaskData({
                    title: "",
                    category: "TODO",
                    priority: "",
                    assign: "",
                    checklist: [{
                        item: null,
                        completed: null
                    }],
                    dueDate: ""
                });
                fetchTasks();
            } else {
                toast.error('Task operation failed');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCloseModal = () => {
        setShowTaskBar(false);
        setShowEditTaskBar(false)
    };

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

    useEffect(() => {
        fetchTasks();
    }, [id]);

    // Filter tasks by category
    const backlogTasks = state.filter(task => task.category === "BACKLOG");
    const todoTasks = state.filter(task => task.category === "TODO");
    const inProgressTasks = state.filter(task => task.category === "PROGRESS");
    const doneTasks = state.filter(task => task.category === "DONE");

    //////////////////////////////// Inner Card  ////////////////////////////////
    const fetchUser = async () => {
        const response = await verifyToken();
        if (response.status === 200) {
            setUser(response.data);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);



    ///////////////////////////// Delete Task /////////////////////////////////////////////
    const handleDelete = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    };
    console.log(openDeleteModal)

    //////////////////////////////// Edit Task /////////////////////////////////////////////
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditState((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //////////////////////////////// Priority  ////////////////////////////////
    const handleEditPriorityChange = (value) => {
        setEditState((prevData) => ({
            ...prevData,
            priority: value,
        }));
    };

    //////////////////////////////// Date  ////////////////////////////////
    const handleEditDate = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        setEditState(prev => ({ ...prev, dueDate: newDate }));
        setShowCalendar(false);
    };
    ///////////////////////////// Checklist //////////////////////////////
    const toggleEditChecklistItem = (e, index) => {
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

    const handleAddEditChecklistItem = () => {
        if (newChecklistItem.trim()) {
            setEditState((prevState) => ({
                ...prevState,
                checklist: [...prevState.checklist, { item: newChecklistItem, completed: false }],
            }));
            setNewChecklistItem('');
        }
    };

    const handleDeleteEditChecklistItem = (index) => {
        setEditState((prevState) => ({
            ...prevState,
            checklist: prevState.checklist.filter((_, i) => i !== index),
        }));
    };

    const handleEdit = async (id) => {
        setEditTaskId(id)
        setShowEditTaskBar(true)
        // try {
        //     const response = await getTasks(editTaskId);
        //     if (response.status === 200) {
        //         setEditState(response.data);
        //         console.log("editState",editState)

        //     } else {
        //         console.error("Error fetching tasks:", response.status);
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        // }
    }

    useEffect(() => {
        const fetchTask = async () => {
            if (editTaskId) {
                try {
                    const response = await getTasks(editTaskId);
                    if (response.status === 200) {
                        setEditState(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            }
        };
        fetchTask();
    }, [showEditTaskBar]);

    const handleUpdateEditedTask = async (e) => {
        e.preventDefault();
        const data = { ...editState };
        console.log("data", data)
        try {
            const response = await updateTask(editTaskId, data);
            if (response.status === 200) {
                toast.success('Task Edited Successfully');
                fetchTasks();
                setShowEditTaskBar(false)
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Task Edit failed');
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////

    const handleModeToggle = (taskId) => {
        setEditMode(editMode === taskId ? null : taskId);
    };

    //////////////////////////////// Update Category ///////////////////////////////////////
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

    const navigate = useNavigate();
    //sharing data for public view
    const handleShare = async (taskId) => {
        console.log("Sharing task with ID:", taskId);
        try {
            const response = await getTasks(taskId);
            if (response.status === 200) {
                const taskData = response.data;
                setState({ sharedTask: taskData });
                navigate("/board");
                console.log("navigating to another board");
            } else {
                console.error("Error fetching task for sharing:", response.status);
            }
        } catch (error) {
            console.error("Error while sharing:", error);
        }
    };


    return (
        <div className="dashboard">
            <Sidebar />
            {/* Dashboard */}
            <div className="board">
                {/* Delete Modal */}
                {DeleteModal && <MyDeleteModal />}
                <header className="dashboard-header">
                    <h1>Welcome! <span>{user.name}</span></h1>
                    <p>{currentDate}</p>
                </header>
                <div className="task-columns">
                    <div className="column">
                        <h2>Backlog</h2>
                        <div>
                            {backlogTasks.map(task => {
                                const priority = task.priority.toUpperCase();
                                let month = 'N/A';
                                let day = 'N/A';
                                if (task.dueDate) {
                                    const dueDate = new Date(task.dueDate);
                                    month = dueDate.toLocaleString(undefined, { month: 'long' });
                                    day = dueDate.toLocaleString(undefined, { day: 'numeric' });
                                }

                                const isEditMode = editMode === task._id; // Toggle for edit mode

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
                                                <span> | {task.assign || 'N/A'}</span>
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
                                                        {user && user.id === task.creator && (
                                                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                                                        )}
                                                        <button onClick={() => handleEdit(task._id)}>Edit</button>
                                                        <button onClick={() => handleShare(task._id)}>Share</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <h3>{task.title}</h3>

                                        {/* Checklist Section */}
                                        <div className="checklist">
                                            <div className="checklist-header">
                                                <p>Checklist</p>
                                                <p>
                                                    Checklist (
                                                    {task.checklist.filter((item) => item.completed).length}/
                                                    {task.checklist.length})
                                                </p>
                                                <img
                                                    src={isChecklistVisible ? upArrow : downArrow}
                                                    alt="toggle checklist"
                                                    onClick={toggleChecklist}
                                                    className="arrow-icon"
                                                />
                                            </div>

                                            {isChecklistVisible && (
                                                <div className="checklist-items" style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "1rem",
                                                    justifyContent: "space-around"
                                                }}>
                                                    {task.checklist.map((item, index) => (
                                                        <div key={index} className="checklist-item" style={{
                                                            display: "flex",
                                                            gap: "1rem"
                                                        }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={item.completed}
                                                                className="checkbox"
                                                                readOnly
                                                            />
                                                            <span>{item.item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <button>{`${month.slice(0, 3)} ${day}`}</button>

                                            <div style={{
                                                display: "flex",
                                                gap: "4px"
                                            }}>
                                                <button onClick={() => handleUpdateCategory(task._id, 'TODO')}>TODO</button>
                                                <button onClick={() => handleUpdateCategory(task._id, 'PROGRESS')}>PROGRESS</button>
                                                <button onClick={() => handleUpdateCategory(task._id, 'DONE')}>DONE</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                    <div className="column">
                        <div className="add-task">
                            <h2>To do</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <img src={addButton} alt="Add" onClick={() => setShowTaskBar(true)} />
                                <img src={collapseButton} alt="Collapse" />
                            </div>
                        </div>
                        <div>
                            {todoTasks.map(task => {
                                const priority = task.priority.toUpperCase();
                                let month = 'N/A';
                                let day = 'N/A';
                                if (task.dueDate) {
                                    const dueDate = new Date(task.dueDate);
                                    month = dueDate.toLocaleString(undefined, { month: 'long' });
                                    day = dueDate.toLocaleString(undefined, { day: 'numeric' });
                                }

                                const isEditMode = editMode === task._id; // Toggle for edit mode

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
                                                <span> | {task.assign || 'N/A'}</span>
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
                                                        {user && user.id === task.creator && (
                                                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                                                        )}
                                                        <button onClick={() => handleEdit(task._id)}>Edit</button>
                                                        <button onClick={() => handleShare(task._id)}>Share</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <h3>{task.title}</h3>
                                        {/* Checklist Section */}
                                        <div className="checklist">
                                            <div className="checklist-header">
                                                <p>Checklist</p>
                                                <p>
                                                    Checklist (
                                                    {task.checklist.filter((item) => item.completed).length}/
                                                    {task.checklist.length})
                                                </p>
                                                <img
                                                    src={isChecklistVisible ? upArrow : downArrow}
                                                    alt="toggle checklist"
                                                    onClick={toggleChecklist}
                                                    className="arrow-icon"
                                                />
                                            </div>

                                            {isChecklistVisible && (
                                                <div className="checklist-items">
                                                    {task.checklist.map((item, index) => (
                                                        <div key={index} className="checklist-item">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.completed}
                                                                className="checkbox"
                                                                readOnly
                                                            />
                                                            <span>{item.item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <button>{`${month.slice(0, 3)} ${day}`}</button>

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
                    </div>
                    <div className="column">
                        <h2>In progress</h2>
                        <div>
                            {inProgressTasks.map(task => {
                                const priority = task.priority.toUpperCase();
                                let month = 'N/A';
                                let day = 'N/A';
                                if (task.dueDate) {
                                    const dueDate = new Date(task.dueDate);
                                    month = dueDate.toLocaleString(undefined, { month: 'long' });
                                    day = dueDate.toLocaleString(undefined, { day: 'numeric' });
                                }

                                const isEditMode = editMode === task._id; // Toggle for edit mode

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
                                                <span> | {task.assign || 'N/A'}</span>
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
                                                        {user && user.id === task.creator && (
                                                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                                                        )}
                                                        <button onClick={() => handleEdit(task._id)}>Edit</button>
                                                        <button onClick={() => handleShare(task._id)}>Share</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <h3>{task.title}</h3>
                                        {/* Checklist Section */}
                                        <div className="checklist">
                                            <div className="checklist-header">
                                                <p>Checklist</p>
                                                <p>
                                                    Checklist (
                                                    {task.checklist.filter((item) => item.completed).length}/
                                                    {task.checklist.length})
                                                </p>
                                                <img
                                                    src={isChecklistVisible ? upArrow : downArrow}
                                                    alt="toggle checklist"
                                                    onClick={toggleChecklist}
                                                    className="arrow-icon"
                                                />
                                            </div>

                                            {isChecklistVisible && (
                                                <div className="checklist-items">
                                                    {task.checklist.map((item, index) => (
                                                        <div key={index} className="checklist-item">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.completed}
                                                                className="checkbox"
                                                                readOnly
                                                            />
                                                            <span>{item.text}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <button>{`${month.slice(0, 3)} ${day}`}</button>

                                            <div style={{
                                                display: "flex",
                                                gap: "4px"
                                            }}>
                                                <button onClick={() => handleUpdateCategory(task._id, 'BACKLOG')}>BACKLOG</button>
                                                <button onClick={() => handleUpdateCategory(task._id, 'TODO')}>TODO</button>
                                                <button onClick={() => handleUpdateCategory(task._id, 'DONE')}>DONE</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                    <div className="column">
                        <h2>Done</h2>
                        <div>
                            {doneTasks.map(task => {
                                const priority = task.priority.toUpperCase();
                                let month = 'N/A';
                                let day = 'N/A';
                                if (task.dueDate) {
                                    const dueDate = new Date(task.dueDate);
                                    month = dueDate.toLocaleString(undefined, { month: 'long' });
                                    day = dueDate.toLocaleString(undefined, { day: 'numeric' });
                                }

                                const isEditMode = editMode === task._id; // Toggle for edit mode

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
                                                <span> | {task.assign || 'N/A'}</span>
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
                                                        {user && user.id === task.creator && (
                                                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                                                        )}
                                                        <button onClick={() => handleEdit(task._id)}>Edit</button>
                                                        <button onClick={() => handleShare(task._id)}>Share</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <h3>{task.title}</h3>
                                        {/* Checklist Section */}
                                        <div className="checklist">
                                            <div className="checklist-header">
                                                <p>Checklist</p>
                                                <p>
                                                    Checklist (
                                                    {task.checklist.filter((item) => item.completed).length}/
                                                    {task.checklist.length})
                                                </p>
                                                <img
                                                    src={isChecklistVisible ? upArrow : downArrow}
                                                    alt="toggle checklist"
                                                    onClick={toggleChecklist}
                                                    className="arrow-icon"
                                                />
                                            </div>

                                            {isChecklistVisible && (
                                                <div className="checklist-items">
                                                    {task.checklist.map((item, index) => (
                                                        <div key={index} className="checklist-item">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.completed}
                                                                className="checkbox"
                                                                readOnly
                                                            />
                                                            <span>{item.text}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <button>{`${month.slice(0, 3)} ${day}`}</button>

                                            <div style={{
                                                display: "flex",
                                                gap: "4px"
                                            }}>
                                                <button onClick={() => handleUpdateCategory(task._id, 'BACKLOG')}>BACKLOG</button>
                                                <button onClick={() => handleUpdateCategory(task._id, 'TODO')}>TODO</button>
                                                <button onClick={() => handleUpdateCategory(task._id, 'PROGRESS')}>PROGRESS</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create a Card */}
            <TaskCard isOpen={showTaskBar} onClose={handleCloseModal}>
                <form onSubmit={handleSaveCard}>
                    <div className="form-group">
                        <p className="title">Title <span className="required">*</span></p>
                        <input
                            type="text"
                            placeholder='Enter Task Title'
                            name="title"
                            value={taskData.title}
                            onChange={handleOnChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className='priority'>
                        <label>Select Priority <span className="required">*</span></label>
                        <div className="priority-buttons">
                            <button className="modes" type="button" onClick={() => handlePriorityChange("high")}>
                                <img src={redEllipse} alt="high priority" /> HIGH PRIORITY
                            </button>
                            <button className="modes" type="button" onClick={() => handlePriorityChange("moderate")}>
                                <img src={blueEllipse} alt="moderate priority" /> MODERATE PRIORITY
                            </button>
                            <button className="modes" type="button" onClick={() => handlePriorityChange("low")}>
                                <img src={greenEllipse} alt="low priority" /> LOW PRIORITY
                            </button>
                        </div>
                    </div>

                    <div class="assign-container">
                        <p class="assign-label">
                            Assign to
                            <span>
                                <select name="assign" id="assign" class="assign-select">
                                    <option value="Akashgupta@gmail.com">Akashgupta@gmail.com</option>
                                </select>
                            </span>
                        </p>
                    </div>


                    <div>
                        <label className='checklist'>
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
                                    <input
                                        type="text"
                                        value={checklistItem.item}
                                        onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                                        aria-label={`Checklist item ${index}`}
                                    />
                                    <img
                                        src={bin}
                                        alt="Delete"
                                        onClick={() => handleDeleteChecklistItem(index)}
                                    />
                                </div>
                            ))}
                        </div>

                        <button className="addchecklist" type="button" onClick={handleAddChecklistItem}>
                            + Add New
                        </button>
                    </div>


                    <div className="modal-footer">
                        <button className="calendar" type="button" onClick={toggleCalendar}>
                            {formatDate(selectedDate)}
                        </button>
                        {showCalendar && (
                            <div className="calendar-popup">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="date-input"
                                />
                            </div>
                        )}
                        <div>
                            <button className="cancel" type="button" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button type="submit" className="save">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </TaskCard>

            {/* Edit a Card */}
            <TaskCard isOpen={showEditTaskBar} onClose={handleCloseModal}>
                <form onSubmit={handleUpdateEditedTask}>
                    <div>
                        <p>Title <span style={{ color: "red" }}>*</span></p>
                        <input
                            type="text"
                            placeholder={editState.title}
                            name="title"
                            value={editState.title}
                            onChange={handleEditChange}
                            required
                        />
                    </div>

                    <p>Select Priority <span style={{ color: "red" }}>*</span></p>

                    <button className="modes" type="button" onClick={() => handleEditPriorityChange("high")}>
                        <img src={redEllipse} alt="high priority" /> HIGH PRIORITY
                    </button>

                    <button className="modes" type="button" onClick={() => handleEditPriorityChange("moderate")}>
                        <img src={blueEllipse} alt="moderate priority" /> MODERATE PRIORITY
                    </button>

                    <button className="modes" type="button" onClick={() => handleEditPriorityChange("low")}>
                        <img src={greenEllipse} alt="low priority" /> LOW PRIORITY
                    </button>

                    <div>
                        <p>Assign to
                            <span>
                                <input
                                    type="text"
                                    placeholder={editState.assign}
                                    name="assign"
                                    // value={editState.assign} 
                                    onChange={handleEditChange}
                                />
                            </span>
                        </p>
                    </div>

                    {/*  */}
                    <div>
                        {editState.checklist?.map((checklistItem, index) => (
                            <div key={index} className="checklist-item">
                                <input
                                    type="checkbox"
                                    checked={checklistItem.completed}
                                    onChange={() => toggleEditChecklistItem(null, index)}
                                    id={`checklist-item-${index}`}
                                />
                                <label htmlFor={`checklist-item-${index}`}>
                                    {checklistItem.item}
                                </label>
                                <img
                                    src={bin}
                                    alt="Delete"
                                    onClick={() => handleDeleteEditChecklistItem(index)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        ))}
                        <div>
                            <input
                                type="text"
                                onChange={(e) => setNewChecklistItem(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddEditChecklistItem()}
                                placeholder="+ Add New"
                                aria-label="New checklist item"
                            />
                        </div>
                    </div>


                    <div className="modal-footer">
                        <button type="button" onClick={toggleCalendar}>
                            {formatDate(selectedDate)}
                        </button>
                        {showCalendar && (
                            <div className="calendar-popup">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleEditDate}
                                    className="date-input"
                                />
                            </div>
                        )}
                        <button type="button" onClick={handleCloseModal}>
                            Cancel
                        </button>
                        <button type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </TaskCard>
        </div>
    );
};
