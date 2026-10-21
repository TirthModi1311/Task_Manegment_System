
import { useEffect, useState } from "react";
import axios from "axios";

const TaskModel = ({ token, isOpen, isEditing, taskToEdit, onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        size: 'Medium',
        date: 'Oct 26'
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing && taskToEdit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                id: taskToEdit.Id || taskToEdit.id || '',
                title: taskToEdit.Title || taskToEdit.title || '',
                description: taskToEdit.Description || taskToEdit.description || '',
                status: taskToEdit.Status || taskToEdit.status || 'Pending',
                priority: taskToEdit.priority || taskToEdit.Priority || 'Medium',
                size: taskToEdit.Size || taskToEdit.size || 'Medium',
                date: taskToEdit.Date || taskToEdit.date || 'Oct 26'
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'Pending',
                priority: 'Medium',
                size: 'Medium',
                date: 'Oct 26'
            });
        }

        setError('');
    }, [isEditing, taskToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError('Task title is required.');
            return;
        }
        try {
            const url = isEditing
                ? `http://localhost:5000/api/tasks/${formData.id}`
                : 'http://localhost:5000/api/tasks';

            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                // priority: formData.priority,
                Title: formData.title,
                Description: formData.description,
                Status: formData.status,
                // Priority: formData.priority
            };

            // Create or update task using Axios
            const response = isEditing
                ? await axios.put(url, payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                : await axios.post(url, payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

            if (response.status >= 200 && response.status < 300) {
                onSuccess(); // Refresh list
                onClose();   // Close modal
            }

        } catch (err) {
            console.error('API Error:', err.response?.data || err.message);

            setError(
                err.response?.data?.Error ||
                err.response?.data?.message ||
                'Failed to save task.'
            );
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{isEditing ? 'Edit Task' : 'Create New Task'}</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <p className="modal-subtitle">Manage Your Task Information</p>

                {error && <div className="error-badge">{error}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Task Title</label>
                        <input
                            type="text"
                            placeholder="Write Your Task here"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows="3"
                            placeholder="Detail Description of Task"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Priority (Frontend Only)</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit" className="btn-save">
                            {isEditing ? 'Update Task' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModel;
