import { Collection } from 'backbone';
import TodoModel from '../models/todo';

const TodoCollection = Collection.extend({
    url: 'http://localhost:3000/todos',
    model: TodoModel,
});

export default TodoCollection;