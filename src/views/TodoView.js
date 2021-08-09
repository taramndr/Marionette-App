import { View } from 'backbone.marionette';
import _ from 'underscore';
import todoTemplate from '../templates/todo.html';
import variables from '../services/variables';
import { formatDate } from '../services/dateTime';

const TodoView = View.extend({
    //tagName: 'li',
    template: todoTemplate,
    ui: {
        todoCard: '.todo-card__container',
        todoCardInfo: '.todo-card__info',
        todoCardDelete: '.todo-card__delete',
        todoInputTitle: '.todo-form__update__title',
        todoInputInfo: '.todo-form__update__info',
        modalCloseBtn: '.close',
        modal: '.todo-card__form:not(.todo-modal__content)'
    },
    events: {
        'dragstart @ui.todoCard': 'onDragStart',

        // 'click @ui.todoCard': 'showUpdateInputFields',
        'click @ui.todoCardInfo': 'showUpdateInputFields',
        'click @ui.todoCardDelete': 'onCardDelete',
        'click @ui.modalCloseBtn': 'onPressCloseModal',
        'click @ui.modal': 'onClickModal',
        // 'keydown @ui.todoInputTitle': 'onPressEnter',
        // 'keydown @ui.todoInputInfo': 'onPressEnter',

    },
    onDragStart(event) {
        console.log('event: ', event)
        event.originalEvent.dataTransfer.effectAllowed = 'drag';

        event.originalEvent.dataTransfer.setData(
            'text',
            this.model.get('id')
        );
        console.log(
            'dataTransfer',
            event.originalEvent.dataTransfer.getData('text')
        );
    },
    onClickModal(e) {
        // e.stopPropagation();
        if (e.target === e.currentTarget) {
            // alert('clicked outside modal')
            console.log('Update Form: ')
            this.updateToDo();
        }
    },
    onPressCloseModal() {
        this.$('.todo-card__form').toggleClass('hide');
    },
    showUpdateInputFields() {
        console.log('show update form: ')
        // show update input
        this.$('.todo-form__update__info').focus();
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
    // onPressEnter(e) {
    //     if (e.which === 13) {
    //         this.updateToDo();
    //     }
    // },
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
                    variables.todosCollection
                        .findWhere({ id: currentModelTodoId })
                        .set('modifiedOn', new Date());

                    this.trigger('render:todo');
                },
                error: (error) => {
                    console.log('Error on update task:', error)
                }
            })

    },
    templateContext() {
        const modifiedDateString = this.model.get('modifiedOn');
        const modifiedDate = formatDate(modifiedDateString);

        return {
            id: this.model.get('id'),
            title: this.model.get('title'),
            info: this.model.get('info'),
            modifiedOn: modifiedDate,
        }
    },
});

export default TodoView;