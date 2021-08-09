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
        mainRegion: '.main-region',
    },
    events: {
        'click a': 'toogleMenu',
        'click @ui.mainRegion': 'onPressBody',
    },
    childViewEvents: {
        "render:todos": "reRenderView",
    },
    toogleMenu(e) {
        e.preventDefault();
        console.log('clicked menu')
    },
    onPressBody(e) {
        console.log('onPressBody -- ', e.target);
        if (e.target.nodeName === 'DIV') {
            // add form
            this.$('.todo-add__form__disabled__input__wrap').removeClass('hide');
            this.$('.todo-add__form__container').addClass('hide');
            const todoView = new TodosView(
                {
                    collection: variables.todosCollection,
                    model: new TodoModel(),
                }
            );
            todoView.addToDo();

            // update form
            this.$('.todo-card__form').addClass('hide');
            this.$('.todo-card__info').removeClass('hide');
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