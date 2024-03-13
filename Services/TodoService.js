const Todo = require('../Models/Todo');

const findAll = () => {
    return Todo.find({});
}

const createTodo = (userId, data) => {
    try {
        return Todo.create({
            userId: userId,
            title: data.title,
            description: data.description,
        });
    } catch (error) {
        console.error(error)
        return error
    }
}

const updateTodo = (userId, todoId, data) => {
    try {
        return Todo.findByIdAndUpdate(
            todoId,
            {
                userId: userId,
                title: data.title,
                description: data.description,
                isDone: data.isDone
            },
            { new: true }
        );
    } catch (error) {
        console.error(error)
        return error
    }
}

const deteleTodo = (todoId) => {
    try {
        return Todo.findByIdAndDelete(todoId)
    } catch (error) {
        return error
    }
}


module.exports = {
    findAll,
    createTodo,
    updateTodo,
    deteleTodo
}