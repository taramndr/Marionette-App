import { Model } from 'backbone';

const TodoModel = Model.extend({
    url: function () {
        return "http://localhost:3000/todos";
    },
    defaults: {
        id: '',
        title: '',
        info: '',
    },
    initialize: function () {
        console.log('TodoModel has been initialized.');
    }
});

export default TodoModel;