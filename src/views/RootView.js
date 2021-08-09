import { View } from 'backbone.marionette';
import _ from 'underscore';

import template from '../templates/main.html';
import TodosView from './TodosView';
import variables from '../services/variables';
import TodoModel from '../models/todo';

const RootView = View.extend({
    urlRoot: 'http://localhost:3000/todos',
    regions: {
        main: '.main-region',
    },
    template: template,
    ui: {
        mainRegion: '.main-region > div',
        // header: '.header',
        searchFormInput: '.header-search__input'
    },
    events: {
        'click a': 'toogleMenu',
        'click @ui.mainRegion': 'onPressMainBody',
        'keydown @ui.searchFormInput': 'onSearchFormSubmit',
    },
    childViewEvents: {
        "render:todos": "reRenderView",
    },
    toogleMenu(e) {
        e.preventDefault();
        console.log('clicked menu')
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
                            // Render to eradicate update
                            this.render();
                        },
                        error: (error) => {
                            console.log('Error on new task addition', error)
                        }
                    })
            }
        }
    },
    onSearchFormSubmit(e) {
        if (e.which === 13) {
            const searchedText = this.$('.header-search__input').val();
            variables.todosCollection.fetch({
                data: { search: searchedText }
            });
        }
    },
    reRenderView() {
        console.log('reRenderTodos: ')
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
