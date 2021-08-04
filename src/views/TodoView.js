import { View } from 'backbone.marionette';
import _ from 'underscore';
import todoTemplate from '../templates/todo.html';

const TodoView = View.extend({
    tagName: 'li',
    template: todoTemplate,

    templateContext() {
        return {
            id: this.model.get('id'),
            title: this.model.get('title'),
            info: this.model.get('info')
        }
    },
});

export default TodoView;