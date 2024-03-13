var mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({ name: String });

const TodoSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    editTime: {
        type: Date,
        default: Date.now
    },
    isDone: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: [CategorySchema],
        default: undefined,
    }
});

mongoose.model('Todo', TodoSchema);

module.exports = mongoose.model('Todo');