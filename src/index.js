import Marionette, { View, Application, CollectionView, TemplateCache, MnObject } from 'backbone.marionette';
import { Model, Collection } from 'backbone';
import _ from 'underscore';

import { NavView } from './views/nav';
import { TodosView } from './views/todos';

/*
// Import the Backbone module and its dependencies
// test
var Backbone = require('backbone');

// Import our view
var AppView = require('./app');

// Execute after the DOM has loaded
Backbone.$(function () {
    // Create an instance of our view
    new AppView();
});
*/

const RootView = View.extend({
    template: _.template('<nav id="nav-content"></nav><div id="body-content"></div>'),
    regions: {
        nav: '#nav-content',
        main: '#body-content'
    },
    onRender() {
        this.showChildView('nav', new NavView());
        this.showChildView('main', new TodosView());
    }
});

const rootView = new RootView();


const App = Application.extend({
    region: '#root',

    onStart(app, options) {
        this.showView(rootView);
    }
});

const app = new App();

app.start();



//new View({ el: 'body' });
//new Marionette.Application();

// View.setRenderer(TemplateCache.render);

/*
const Friend = MnObject.extend({
    initialize(options) {
        console.log(options.name);
        console.log(options.age);

    }
});

new Friend({ name: 'John', age: 20 });
const MyObject = MnObject.extend({
    initialize(options, arg2) {
        console.log(options.foo, this.getOption('foo'), arg2);
        this.triggerMethod('foo', 'baz');
    },
    onFoo(bar) {
        console.log('OnFoo function is triggered: ', bar)
    }
});
const myObject = new MyObject({ foo: 'bar' }, 'baz');

*/
