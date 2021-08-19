import { Application } from 'backbone.marionette';
import RootView from './views/RootView';
import TodoCollection from './collections/todos';
import variables from './services/variables';

import Router from "./router";
import { history } from "backbone";

variables.todosCollection = new TodoCollection();

const App = Application.extend({
    region: '#root',
    initialize(options) {
        console.log('Initialize');
    },
    onBeforeStart(app, options) {
        //
    },
    onStart(app, options) {
        this.router = new Router();
        history.start({pushState: true});

        // commented below after applying router
        // const rootView = new RootView();
        // this.showView(rootView);
    }
});

variables.todosCollection.fetch({
    success: () => {
        app.start();
    },
    error: (error) => {
        console.log("error on collection fetch:", error);
    },
});

const app = new App();
// app.start();
export default app;