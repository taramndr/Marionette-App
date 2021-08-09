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
        todoDisabledInputWrap: '.todo-add__form__disabled__input__wrap',
        todoInputTitle: '.todo-add__form__title',
        todoInputInfo: '.todo-add__form__info',
        todoFormClose: '.todo-add__form__close',
        todoFormAddTodo: '.todo-add__form__add__todo',
    },
    events: {
        'drop @ui.todoContainer': 'onDrop',
        'dragover @ui.todoContainer': 'onDragOverAllowDrop',

        'click @ui.todoDisabledInputWrap': 'showAddTodoForm',
        'click @ui.todoFormClose': 'onCloseForm',
        'click @ui.todoFormAddTodo': 'addToDo',
        'keydown @ui.todoInputTitle': 'onPressEnter',
        // 'keydown @ui.todoInputInfo': 'onPressEnter',
    },
    childViewEvents: {
        'render:todo': 'reRenderView',
    },
    onDragOverAllowDrop(event) {
        event.preventDefault();
    },
    onDrop(e) {
        e.preventDefault();

        var data = e.originalEvent.dataTransfer.getData('text');
        //var modelData = JSON.parse(data);

        console.log('modelID: ', data)
        // this.trigger("update:sort");
        console.log('model:', this.model)

        // let draggedTodoModel = variables.todosCollection.findWhere({
        //     id: data,
        // });
        // console.log('draggedTodoModel: ', draggedTodoModel)
        // console.log('whole collection --', this.collection)

        // this.collection.remove(model);

        // this.collection.each(function(model, index){
        //   var ordinal = index;
        //   if(index >= position){
        //     ordinal+=1;
        //   }
        //   model.set("ordinal", ordinal);
        // });

        // model.set("ordinal", position);
        // this.collection.add(model, {at: position});
        // this.render();

    },
    reRenderView() {
        this.render();
    },
    showAddTodoForm() {
        this.$('.todo-add__form__disabled__input__wrap').toggleClass('hide');
        this.$('.todo-add__form__container').toggleClass('hide');
        this.$('.todo-add__form__info').focus();
    },
    onCloseForm(e) {
        e.preventDefault();
        this.$('.todo-add__form__disabled__input__wrap').toggleClass('hide');
        this.$('.todo-add__form__container').toggleClass('hide');
    },
    onPressEnter(e) {
        if (e.which === 13) {
            this.addToDo();
        }
    },
    addToDo(e) {
        // Add new ToDo
        // get form input values
        let todoTitle = this.$('.todo-add__form__title').val();
        let todoInfo = this.$('.todo-add__form__info').val();

        if (this.model) {
            this.model.set('title', todoTitle);
            this.model.set('info', todoInfo);
            this.model.set('modifiedOn', new Date());

            if (todoTitle && todoInfo) {
                this.model.save({},
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
        }
    },
});

export default TodosView;
