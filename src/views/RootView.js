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
        'click @ui.mainRegion': 'onPressBodyRoot',
    },
    childViewEvents: {
        "render:todos": "reRenderView",
    },
    toogleMenu(e) {
        e.preventDefault();
        console.log('clicked menu')
    },
    onPressBodyRoot() {
        // this.toggleExtraFormInput();
    },
    reRenderView() {
        console.log('reRenderTodos:: ')
        this.render();
    },
    onRender() {
        console.log("Root view rendered");

        this.showChildView('main', new TodosView({
            collection: variables.todosCollection,
            model: new TodoModel()
        }));
    },
});

export default RootView;