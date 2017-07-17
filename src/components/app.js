/*eslint-disable strict */ //Disabling check because we can't run strict mode. need global vars.

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery'); //global var

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;