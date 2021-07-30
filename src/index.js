// Import the Backbone module and its dependencies
var Backbone = require('backbone');

// Import our view
var AppView = require('./app.view');

// Execute after the DOM has loaded
Backbone.$(function () {
    // Create an instance of our view
    new AppView();
});