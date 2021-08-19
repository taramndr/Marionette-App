import { View } from 'backbone.marionette';

import template from '../templates/main.html';
import TodosView from './TodosView';
import variables from '../services/variables';
import TodoModel from '../models/todo';

const RootView = View.extend({
    // urlRoot: 'http://localhost:3000/todos',
    tagName: 'main',
    className: 'main-region-container',
    regions: {
        main: '.main-region',
    },
    template,
    ui: {
        mainRegion: '.main-region > div',
        searchFormInput: '.header-search__input',
        searchResetBtn: '.header-search__input__reset',
    },
    events: {
        'click a': 'onLinkClick',

        'click @ui.mainRegion': 'onPressMainBody',
        'click .header': 'onPressMainBody',
        'click .footer': 'onPressMainBody',
        'click .todos-container': 'onPressMainBody',

        'change @ui.searchFormInput': 'onSearchInputChange',
        'keydown @ui.searchFormInput': 'onSearchFormSubmit',
        'click @ui.searchResetBtn': 'onPressSearchReset'
    },
    childViewEvents: {
        "render:todos": "reRenderView",
    },
    onLinkClick(e) {
        e.preventDefault();
    },
    onPressMainBody(e) {
        // Add new task on clicking on other body elements

        //if (e.target.nodeName === 'DIV') {
        if (e.target === e.currentTarget) {
            // Get add form input values
            let todoTitle = this.$('.todo-add__form__title').val();
            let todoInfo = this.$('.todo-add__form__info').val();
            const toDoModel = new TodoModel();

            if (todoTitle && todoInfo) {
                console.log('Add new task on clicking on other body elements')

                toDoModel.set('title', todoTitle);
                toDoModel.set('info', todoInfo);
                toDoModel.set('modifiedOn', new Date());
                toDoModel.save({},
                    {
                        success: (res) => {
                            variables.todosCollection.push(toDoModel);
                            variables.todosCollection.fetch();

                            // Render to eradicate update
                            this.render();
                        },
                        error: (error) => {
                            console.log('Error on new task addition', error)
                        }
                    })
            } else {
                this.$('.todo-add__form__title').val('');
                this.$('.todo-add__form__info').val('');
                this.$('.todo-add__form__disabled__input__wrap').removeClass('hide');
                this.$('.todo-add__form__container').addClass('hide');
            }
        }
    },
    onPressSearchReset() {
        this.$('.header-search__input').val('');
        this.searchTodos();
    },
    onSearchInputChange() {
        this.searchTodos();
    },
    onSearchFormSubmit(e) {
        if (e.which === 13) {
            this.searchTodos();
        }
    },
    searchTodos() {
        const searchedText = this.$('.header-search__input').val();
        variables.todosCollection.fetch({
            data: { search: searchedText }
        });
    },
    reRenderView() {
        variables.todosCollection.fetch();
        // this.trigger('sync');
        this.render();
    },
    onRender() {
        this.showChildView('main', new TodosView({
            collection: variables.todosCollection,
            model: new TodoModel(),
        }));
    },
});

export default RootView;
