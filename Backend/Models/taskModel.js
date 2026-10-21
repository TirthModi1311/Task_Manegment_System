
const db = require("../config/db");


const Task = {

    async findByUserId(userId){

        // get all task to a sprecific user

        const [rows] =await db.query(
            'SELECT * FROM tasks WHERE user_id = ?',
            [userId],
        );
        return rows;
    },

    //create a new task

    async create(userId, title, description, status){

        const [result] = await db.query(
            'INSERT INTO tasks (user_Id, title, description, status) VALUES(?, ?, ?, ?)',
            [userId, title, description || '', status || 'Pending']
        );
        return result.insertId;    // give us how many rows insertedd into db table
    },  

    //update an exsisting task 

    async update(taskId, userId, title, description, status){

        const[result] = await db.query(
            'UPDATE tasks SET title = ?, description =?, status=? WHERE id =?  AND user_id = ?',
            [title, description, status || 'Pending', taskId, userId]
        );
        return result.affectedRows;             // gives us how many rows are updated
    },

    //delete an existing task

    async delete(taskId, userId){

        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [taskId, userId]
        );
        return result.affectedRows   // gives us how many rows are deleted
    }
}

module.exports = Task;


