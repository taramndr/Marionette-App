import { Router } from 'backbone';
import RootView from './views/RootView';
import app from "./main";

export default Router.extend({
    // views: {
    //     about: null,
    //     home: null,
    //   },
      
    routes: {
      "": "home",
      "about": "showAboutView"
    },
  
    initialize() {
        console.log('Initialize Router: ')
    },
  
    home() {
        const rootView = new RootView();
        app.showView(rootView);
    },
  
    showAboutView() {
        console.log('get about view --')
      
    },
  })