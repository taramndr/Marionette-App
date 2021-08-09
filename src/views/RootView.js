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
    },
    events: {
        'click a': 'toogleMenu',
        'click @ui.mainRegion': 'onPressMainBody',
    },
    childViewEvents: {
        "render:todos": "reRenderView",
    },
    toogleMenu(e) {
        e.preventDefault();
        console.log('clicked menu')
    },
    onPressMainBody(e) {
        //if (e.target.nodeName === 'DIV') {
        /* if (e.target === e.currentTarget) {
            // proceed add todo operation
            this.$('.todo-add__form__disabled__input__wrap').removeClass('hide');
            this.$('.todo-add__form__container').addClass('hide');
            const todosView = new TodosView(
                {
                    collection: variables.todosCollection,
                    model: new TodoModel(),
                }
            );

            todosView.addToDo();
        } */
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