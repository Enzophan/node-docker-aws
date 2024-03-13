const express = require('express');
const router = express.Router();
const TodoService = require('../Services/TodoService');

router.get('/', async (req, res) => {
    const todos = await TodoService.findAll();
    return res.status(200).send(todos);
})

// CREATE NEW TODO
router.post('/', async (req, res) => {
    const todo = await TodoService.createTodo(req.user.id, req.body);
    return res.status(200).send(todo);
});

// UPDATE TODO
router.put('/:id', async (req, res) => {
    const todo = await TodoService.updateTodo(req.user.id, req.params.id, req.body);
    return res.status(200).send(todo);
});

// DELETE TODO
router.delete('/:id', async (req, res, next) => {
    const todo = await TodoService.deteleTodo(req.params.id);
    if (!todo) return res.status(404).send({ msg: "Not found" });

    return res.status(200).send({ "_id": todo._id, msg: "Deleted successful" });
})

module.exports = router;