import { Model } from 'backbone';

const TodoModel = Model.extend({
    url: function () {
        if (this.id) {
            return 'http://localhost:3000/todos/' + this.id;
        } else {
            return 'http://localhost:3000/todos';
        }
    },
    initialize: function () {
        console.log('TodoModel has been initialized.');
    }
});

export default TodoModel;