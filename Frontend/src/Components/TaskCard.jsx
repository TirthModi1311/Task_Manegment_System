

const TaskCard = ({ task, onEdit, onDelete }) => {

    const currentStatus = task.Status || task.status || 'Pending';
    const taskPriority = task.priority || 'Medium';
  return (
    <div className="task-card">
      <div className="card-top">

        <h3 className="task-title">{task.Title}</h3>
        <span className={`status-badge status-${currentStatus.toLowerCase().replace(/\s+/g, '-')}`}>
      {currentStatus}
    </span>
      </div>

      <p className="task-description">{task.Description}</p>

      <div className="card-bottom">
        <div className="tag-group">
          <span className="tag">{taskPriority}</span>
        </div>

        <div className="action-buttons">
          <button className="icon-btn edit-btn" onClick={() => onEdit(task)} title="Edit Task">
            ✏️
          </button>

          <button className="icon-btn delete-btn" onClick={() => onDelete(task.Id || task.id)} title="Delete Task">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;