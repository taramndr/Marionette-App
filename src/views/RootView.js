import { View } from 'backbone.marionette';
import _ from 'underscore';

import template from '../templates/main.html';
import TodosView from './TodosView';
import TodoModel from '../models/todo';

const RootView = View.extend({
    urlRoot: 'http://localhost:3000/todos',
    regions: {
        main: '.main-region',
    },
    template: template,
    ui: {
        mainRegion: '.main-region',
        todoInputTitle: '.todo-form__title',
        todoInputInfo: '.todo-form__info',
        todoFormClose: '.todo-form_close'
    },
    events: {
        'click a': 'toogleMenu',
        'click @ui.mainRegion': 'onPressBodyRoot',
        'focus @ui.todoInputTitle': 'onFocusInputTitle',
        'click @ui.todoFormClose': 'onCloseForm',
        'keydown @ui.todoInputTitle': 'onPressEnter',
        'keydown @ui.todoInputInfo': 'onPressEnter',
    },
    toogleMenu(e) {
        e.preventDefault();
        console.log('clicked menu')
    },
    onPressBodyRoot() {
        this.toggleExtraFormInput();
    },
    onFocusInputTitle() {
        this.toggleExtraFormInput();
    },
    onCloseForm(e) {
        e.preventDefault();
        this.toggleExtraFormInput();
    },
    toggleExtraFormInput() {
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
        console.log('todoTitle', todoTitle)
        console.log('todoInfo', todoInfo)

        console.log("this.model", this.model);
        // return this.model.save(null, { type: 'POST' });

        // for anything  complex, make a custom call.
        //  return Backbone.ajax(_.extend({
        //     url: this.url(),
        //     method: "POST",
        //     data: this.attributes,
        //     dataType: "json",
        // }, options));
    },
    onRender() {
        this.$('.todo-form__info').addClass('hide');
        this.$('.todo-form_close').addClass('hide');

        this.showChildView('main', new TodosView());
    },
});

export default RootView;