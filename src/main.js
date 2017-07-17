"use strict";

//Complete application available: https://github.com/coryhouse/react-flux-building-applications
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

//cleaner url:
//Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
});
