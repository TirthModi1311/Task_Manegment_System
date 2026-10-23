
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskCard from "../Components/TaskCard";
import TaskModel from "../Models/TaskModel";

const DashBoard = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    // const [filter, setFilter] = useState('All Status');
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');

    const [isModalOpen, setIsModelOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedtask, setSelectedTask] = useState(null);

    // Fetch tasks From Sql backend using Axios

    const fetchTasks = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                    'https://taskmanegmentsystem.netlify.app/api/tasks',
                    {
                        headers: {
                        'Authorization': `Bearer ${token}`
                     }
                    }
            );
            setTasks(response.data);
        }
        catch (error) {
            console.error('Error Fetching tasks:', error.response?.data || error.message);
        }
        finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();
    }, [fetchTasks]);

    const handleOpenCreateModel = () => {
        setIsEditing(false);
        setSelectedTask(null);
        setIsModelOpen(true);
    };

    const handleOpenEditModel = (task) => {
        setIsEditing(true);
        setSelectedTask({
            Id: task.Id || task.id,
            Title: task.Title || task.title,
            Description: task.Description || task.description,
            Status: task.Status || task.status
            // priority: task.priority || 'Medium'
        });

        setIsModelOpen(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await axios.delete(
                `https://taskmanegmentsystem.netlify.app/api/tasks/${taskId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

            fetchTasks();
        }
        catch (error) {
            console.error('Error deleting task:', error.response?.data || error.message);
            alert('Failed to delete task.');
        }
    };

    // Filter tasks based on status from dropdown

    const filteredTasks = tasks.filter((task) => {
        // If filter is 'All', return true immediately
        if (!filterStatus || filterStatus.trim().toLowerCase() === 'all') return true;

        // Otherwise, match the task status
        const rawStatus = task.Status || task.status;
        const taskStatus = (!rawStatus || rawStatus.trim() === '')
            ? 'pending'
            : rawStatus.trim().toLowerCase();

        return taskStatus === filterStatus.trim().toLowerCase();
    });

    return (
        <div className="dashboard-layout">
            <h1 className="dashboard-title">Task Overview Dashboard</h1>

            <div className="dashboard-main">

                {/* for sidebar */}
                <div className="sidebar-controls">
                    <button
                        className="btn-new-task"
                        onClick={handleOpenCreateModel}>
                        + New Task
                    </button>

                    <select
                        className="filter-dropdown"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Task List Container */}
                <div className="task-list-container">
                    {
                        loading ?
                            (
                                <p className="loading-text">Loading tasks from database...</p>
                            ) : filteredTasks.length === 0 ?
                                (
                                    <div className="empty-state">
                                        <p>No tasks found matching your criteria.</p>
                                    </div>
                                ) :
                                (
                                    filteredTasks.map((task, index) => (
                                        <TaskCard
                                            key={task.Id || task.id || index}
                                            task={task}
                                            onEdit={handleOpenEditModel}
                                            onDelete={handleDeleteTask}
                                        />
                                    ))
                                )
                    }
                </div>
            </div>

            <TaskModel
                token={token}
                isOpen={isModalOpen}
                isEditing={isEditing}
                taskToEdit={selectedtask}
                onClose={() => setIsModelOpen(false)}
                onSuccess={fetchTasks}
            />

        </div>
    );
};

export default DashBoard;
