import { View } from 'backbone.marionette';
import _ from 'underscore';
import todoTemplate from '../templates/todo.html';
import variables from '../services/variables';

const TodoView = View.extend({
    //tagName: 'li',
    template: todoTemplate,
    ui: {
        todoCard: '.todo-card__container',
        todoCardInfo: '.todo-card__info',
        todoCardDelete: '.todo-card__delete',
        todoInputTitle: '.todo-form__update__title',
        todoInputInfo: '.todo-form__update__info',
    },
    events: {
        'dragstart @ui.todoCard': 'onDragStart',
        'click @ui.todoCardInfo': 'showUpdateInputFields',
        'click @ui.todoCardDelete': 'onCardDelete',
        'keydown @ui.todoInputTitle': 'onPressEnter',
        'keydown @ui.todoInputInfo': 'onPressEnter',
    },
    onDragStart(event) {
        let thisModel = this.model.toJSON();
        event.originalEvent.dataTransfer.effectAllowed = "move";

        event.originalEvent.dataTransfer.setData(
            'text',
            JSON.stringify(thisModel)
        );
        console.log(
            'dataTransfer',
            event.originalEvent.dataTransfer.getData("text")
        );
    },
    showUpdateInputFields() {
        // show update input
        console.log('onCardAction', this.model.get('title'))
        this.$('.todo-form__update__info').focus();
        this.$('.todo-card__info').toggleClass('hide');
        this.$('.todo-card__form').toggleClass('hide');
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
    onPressEnter(e) {
        if (e.which === 13) {
            this.updateToDo();
        }
    },
    updateToDo() {
        // get update form input values
        let todoTitle = this.$('.todo-form__update__title').val();
        let todoInfo = this.$('.todo-form__update__info').val();

        let currentModelTodoId = this.model.get('id');
        this.model.set('title', todoTitle);
        this.model.set('info', todoInfo);

        this.model.save({},
            {
                success: (res) => {
                    // 
                    console.log('On update success:', res)
                    variables.todosCollection
                        .findWhere({ id: currentModelTodoId })
                        .set('title', todoTitle);
                    variables.todosCollection
                        .findWhere({ id: currentModelTodoId })
                        .set('info', todoInfo);

                    this.trigger('render:todo');
                },
                error: (error) => {
                    console.log('Error on update task:', error)
                }
            })

    },
    templateContext() {
        return {
            id: this.model.get('id'),
            title: this.model.get('title'),
            info: this.model.get('info')
        }
    },
    // onRender() {
    //     this.$('.todo-card__form').toggleClass('hide');
    // }
});

export default TodoView;