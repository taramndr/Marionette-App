import { CollectionView } from 'backbone.marionette';
import _ from 'underscore';
import TodoView from './TodoView';
import template from '../templates/todos.html';
import variables from '../services/variables';

const TodosView = CollectionView.extend({
    // tagName: 'ul',
    childView: TodoView,
    childViewContainer: '.todos-container',
    template: template,
    ui: {
        todoInputTitle: '.todo-form__title',
        todoInputInfo: '.todo-form__info',
        todoFormClose: '.todo-form_close'
    },
    events: {
        'focus @ui.todoInputTitle': 'onFocusInputTitle',
        'click @ui.todoFormClose': 'onCloseForm',
        'keydown @ui.todoInputTitle': 'onPressEnter',
        'keydown @ui.todoInputInfo': 'onPressEnter',
    },
    childViewEvents: {
        "render:todo": "reRenderView",
    },
    reRenderView() {
        this.render();
    },
    onFocusInputTitle() {
        this.$('.todo-form__info').removeClass('hide');
        this.$('.todo-form_close').removeClass('hide');
    },
    onCloseForm(e) {
        e.preventDefault();
        this.$('.todo-form__info').toggleClass('hide');
        this.$('.todo-form_close').toggleClass('hide');
    },
    onPressEnter(e) {
        if (e.which === 13) {
            this.addToDo();
        }
    },
    addToDo() {
        // get form input values
        let todoTitle = this.$('.todo-form__title').val();
        let todoInfo = this.$('.todo-form__info').val();

        if (this.model) {
            this.model.set('title', todoTitle);
            this.model.set('info', todoInfo);

            this.model.save({}, // { type: 'POST' },
                {
                    success: (res) => {
                        variables.todosCollection.push(this.model);
                        // Render to eradicate update
                        this.trigger("render:todos");
                    },
                    error: (error) => {
                        console.log('Error on new task addition', error)
                    }
                })
        }
    },
    onRender() {
        this.$('.todo-form__info').addClass('hide');
        this.$('.todo-form_close').addClass('hide');
    }
});

export default TodosView;
