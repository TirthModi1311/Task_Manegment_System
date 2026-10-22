
// const Task = require("../Models/taskModel");

// const getTasks = async (req, res) =>{

//     // Fetch all task for the user
//     try{
//         const userId = req.user.id;
//         const tasks = await Task.findByUserId(userId);
//         res.json(tasks)
//     }
//     catch(error){
//         console.error('Fetch Tasks Error', error.message);
//         res.status(500).json({
//             Error: 'Server error while fetching tasks'
//         }); 
//     }
// };


// // This Api for create new task
// const createTask = async (req, res)=>{
//     try{
//         const userId = req.user.id;
//         const {title, description, status} = req.body;

//         if(!title){
//             return res.status(400).json({
//                 Error: 'Task title required'
//             })
//         }
//         const finalStatus = (!status || status.trim() === '') ? 'Pending' : status;

//         const taskId = await Task.create(userId, title, description, status);
//         res.status(201).json({
//             message: 'Task Created Successfully',
//             taskId: taskId,
//         })
//     }
//     catch(error){
//         console.error('Create Task Error:', error.message);
//         res.status(500).json({
//             Error: 'Server error while creating tasks'
//         })      
//     }
// };


// // This  Api is for Update existing task

// const updateTask = async (req, res)=>{
//     try{
//         const taskId = req.params.id;
//         const userId = req.user.id;
//         const {title, description, status} = req.body;

//         const finalStatus = (!status || status.trim() === '') ? 'Pending' : status;

//         const affectedRows = await Task.update(taskId, userId, title, description, status);

//         if(affectedRows === 0){
//             return res.status(404).json({
//                 Error: 'Task not found or not exists'
//             })
//         }
//         res.json({
//             message: 'Task Updated Successfully!'
//         });
//     }
//     catch(error){
//         console.error('Update task Error:', error.message);
//         res.status(500).json({
//             Error: 'Server error while updating task'
//         });
//     }
// }


// // This Api for Delete an existing Tasks

// const deleteTask = async (req, res) =>{

//     try{
//         const taskId = req.params.id;
//         const userId = req.user.id;

//         const affectedRows = await Task.delete(taskId, userId);

//         if(affectedRows === 0){
//             return res.status(404).json({
//                 Error: 'Task not found'
//             });
//         }
//         res.json({
//             message: 'Task Deleted Successfully!'
//         });
//     }
//     catch(error){
//         console.error('Delete Task Error:', error.message);
//         res.status(500).json({
//             Error: 'Server error while deleting task'
//         })
//     }
// } 

// module.exports = {getTasks, createTask, updateTask, deleteTask}

const Task = require("../Models/taskModel");

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findByUserId(userId);

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Fetch Tasks Error:", error);

        return res.status(500).json({
            Error: "Server error while fetching tasks"
        });
    }
};

const createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, status } = req.body || {};

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                Error: "Task title required"
            });
        }

        const finalStatus =
            typeof status !== "string" || !status.trim()
                ? "Pending"
                : status.trim();

        const taskId = await Task.create(
            userId,
            title.trim(),
            description || "",
            finalStatus
        );

        return res.status(201).json({
            message: "Task Created Successfully",
            taskId
        });
    } catch (error) {
        console.error("Create Task Error:", error);

        return res.status(500).json({
            Error: "Server error while creating tasks"
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const { title, description, status } = req.body || {};

        if (
            typeof title !== "string" ||
            !title.trim()
        ) {
            return res.status(400).json({
                Error: "Task title required"
            });
        }

        const finalStatus =
            typeof status !== "string" || !status.trim()
                ? "Pending"
                : status.trim();

        const affectedRows = await Task.update(
            taskId,
            userId,
            title.trim(),
            description || "",
            finalStatus
        );

        // Supports models returning either a number
        // or a MySQL result object.
        const rowsChanged =
            typeof affectedRows === "number"
                ? affectedRows
                : affectedRows?.affectedRows;

        if (rowsChanged === 0) {
            return res.status(404).json({
                Error: "Task not found or not updated"
            });
        }

        return res.status(200).json({
            message: "Task Updated Successfully!"
        });
    } catch (error) {
        console.error("Update Task Error:", error);

        return res.status(500).json({
            Error: "Server error while updating task"
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        const affectedRows = await Task.delete(
            taskId,
            userId
        );

        const rowsChanged =
            typeof affectedRows === "number"
                ? affectedRows
                : affectedRows?.affectedRows;

        if (rowsChanged === 0) {
            return res.status(404).json({
                Error: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task Deleted Successfully!"
        });
    } catch (error) {
        console.error("Delete Task Error:", error);

        return res.status(500).json({
            Error: "Server error while deleting task"
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};