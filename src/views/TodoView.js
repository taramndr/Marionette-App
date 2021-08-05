import { View } from 'backbone.marionette';
import _ from 'underscore';
import todoTemplate from '../templates/todo.html';
import variables from '../services/variables';

const TodoView = View.extend({
    //tagName: 'li',
    template: todoTemplate,
    ui: {
        todoCard: '.todo-card__info',
        todoCardDelete: '.todo-card__delete'
    },
    events: {
        'click @ui.todoCard': 'onCardClick',
        'click @ui.todoCardDelete': 'onCardDelete'
    },
    onCardClick() {
        // update card
        console.log('onCardAction')
    },
    onCardDelete() {
        this.model.destroy({
            success: (model) => {
                // update on local collection
                variables.todosCollection.remove(model);
            },
            error: () => {
                console.log("error removing todo");
            },
        });
    },
    templateContext() {
        return {
            id: this.model.get('id'),
            title: this.model.get('title'),
            info: this.model.get('info')
        }
    },
});

export default TodoView;