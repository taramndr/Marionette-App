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
        todoContainer: '.todos-container',
        todoInputTitle: '.todo-add__form__title',
        todoInputInfo: '.todo-add__form__info',
        todoFormClose: '.todo-add__form__close'
    },
    events: {
        'drop @ui.todoContainer': 'onDrop',
        'dragover @ui.todoContainer': 'onDragOverAllowDrop',

        'focus @ui.todoInputTitle': 'onFocusInputTitle',
        'click @ui.todoFormClose': 'onCloseForm',
        'keydown @ui.todoInputTitle': 'onPressEnter',
        'keydown @ui.todoInputInfo': 'onPressEnter',
    },
    childViewEvents: {
        'render:todo': 'reRenderView',
    },
    onDragOverAllowDrop(event) {
        event.preventDefault();
    },
    onDrop(e) {
        console.log('On Drop: ')
        e.preventDefault();

        var data = e.originalEvent.dataTransfer.getData('text');
        var modelData = JSON.parse(data);

        console.log('modelData: ', modelData)
    },
    reRenderView() {
        this.render();
    },
    onFocusInputTitle() {
        this.$('.todo-add__form__info').removeClass('hide');
        this.$('.todo-add__form__close').removeClass('hide');
    },
    onCloseForm(e) {
        e.preventDefault();
        this.$('.todo-add__form__info').toggleClass('hide');
        this.$('.todo-add__form__close').toggleClass('hide');
    },
    onPressEnter(e) {
        if (e.which === 13) {
            this.addToDo();
        }
    },
    addToDo() {
        // get form input values
        let todoTitle = this.$('.todo-add__form__title').val();
        let todoInfo = this.$('.todo-add__form__info').val();

        if (this.model) {
            this.model.set('title', todoTitle);
            this.model.set('info', todoInfo);

            this.model.save({}, // { type: 'POST' },
                {
                    success: (res) => {
                        variables.todosCollection.push(this.model);
                        // Render to eradicate update
                        this.trigger('render:todos');
                    },
                    error: (error) => {
                        console.log('Error on new task addition', error)
                    }
                })
        }
    },
    onRender() {
        // this.$('.todo-add__form__info').addClass('hide');
        // this.$('.todo-add__form__close').addClass('hide');
    }
});

export default TodosView;
