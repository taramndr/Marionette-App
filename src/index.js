import { Application } from 'backbone.marionette';
import RootView from './views/RootView';
import TodoCollection from './collections/todos';
import variables from './services/variables';

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
        const rootView = new RootView({});
        this.showView(rootView);
    }
});

const app = new App();

// app.start({});
variables.todosCollection.fetch({
    success: () => {
        app.start();
    },
    error: (error) => {
        console.log("error on collection fetch:", error);
    },
});
