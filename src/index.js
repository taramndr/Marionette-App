import { Application } from 'backbone.marionette';
import RootView from './views/RootView';
import TodoModel from './models/todo';

const App = Application.extend({
    region: '#root',
    initialize(options) {
        console.log('Initialize');
    },
    onBeforeStart(app, options) {

    },
    onStart(app, options) {
        const rootView = new RootView({
            model: new TodoModel()
        });
        this.showView(rootView);
    }
});

const app = new App();

app.start({});

export default app;

