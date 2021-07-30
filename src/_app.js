console.log('Marionette JS')

import Marionette, { View } from 'backbone.marionette';

const MyView = View.extend({
    className: 'bg-success',

    template: '#template-identifier',

    regions: {
        myRegion: '.my-region'
    },

    modelEvents: {
        change: 'removeBackground'
    },

    removeBackground() {
        this.$el.removeClass('bg-success');
    }
});
// instance of myView
const view = new MyView();
// let app = new Marionette.Application();
