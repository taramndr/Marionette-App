import { CollectionView } from 'backbone.marionette';
import TodoView from './TodoView';
import template from '../templates/todos.html';
import variables from '../services/variables';

const TodosView = CollectionView.extend({
    tagName: 'div', //'ul'
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
        todoFormColorPaletteBtn: '.todo-add__show__color__palette'
    },
    events: {
        //'drop @ui.todoContainer': 'onDrop',
        'drag .todo-card__container': 'draggable',
        'dragstart .each-task': 'dragstart',
        drop: 'onDrop',
        //'dragover @ui.todoContainer': 'onDragOverAllowDrop',
        dragover: 'onDragOverAllowDrop',
        'click @ui.todoDisabledInputWrap': 'showAddTodoForm',
        'click @ui.todoFormClose': 'onCloseForm',
        'click @ui.todoFormAddTodo': 'addToDo',
        'keydown @ui.todoInputTitle': 'onPressEnter',
        'mouseover @ui.todoFormColorPaletteBtn': 'toggleColorPaletteBox',
        'mouseout @ui.todoFormColorPaletteBtn': 'toggleColorPaletteBox',
    },
    childViewEvents: {
        'render:todo': 'reRenderView',
    },
    draggable: function (event) {
        console.log('drag id:', event.target.id)
        this.dragTodoId = event.target.id;

        // variables.mySourceId = event.target.id;
        // variables.mySourceModel = this.model;
    },
    onDragOverAllowDrop(event) {
        event.preventDefault();
    },
    dragstart(event) {
        //
    },
    onDrop(e, index) {
        e.preventDefault();
        console.log('draggged item: ', this.dragTodoId);

        console.log('on drop index: ', e.target)
        console.log('model:', this.model)

        const targetId = e.target.id;
        console.log('on drop targetId: ', targetId);

        if(targetId) {
            console.log('start sorting');
            console.log(variables.todosCollection);
        }

        /* var data = e.originalEvent.dataTransfer.getData('text');
        console.log('modelID: ', data)

        let draggedTodoModel = variables.todosCollection.findWhere({
            id: data,
        });
        console.log('draggedTodoModel: ', draggedTodoModel)
        console.log('whole collection --', this.collection)

        this.collection.remove(model);

        this.collection.each(function(model, index){
          var ordinal = index;
          if(index >= position){
            ordinal+=1;
          }
          model.set('ordinal', ordinal);
        });

        model.set("ordinal", position);
        this.collection.add(model, {at: position});
        this.render();  */

    },
    reRenderView() {
        this.render();
    },
    toggleColorPaletteBox() {
        console.log('hover: ')
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
    initialize() {
        console.log('Init Todos')
        this.dragTodoId = '';
    }
});

export default TodosView;
