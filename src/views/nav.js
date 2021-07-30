import { View } from 'backbone.marionette';
import _ from 'underscore';

export const NavView = View.extend({
    tagName: 'span',
    template: _.template('<p><%= text%></p>'),

    templateContext() {
        return {
            text: 'Nav Section'
        }
    },
});

