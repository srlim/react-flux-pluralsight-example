"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
    mixins: [ //in react, need to use the term mixins to detect mixins
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) { //has the data that has been entered saved yet
                transition.abort();
            }
        }
    },

    getInitialState: function() {
        return {
            course: {
                title: '',
                id: '',
                author: {
                    id: '',
                    name: ''
                },
                category: '',
                length: ''
            },
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        var courseId = this.props.params.id; //from the path '/author:id'
        if (courseId) {
            this.setState({course: CourseStore.getCoursesById(courseId)});
        }
    },

    setCourseState: function(event) { //called for every keypress I make
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },

    courseFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors

        if (this.state.course.title.length < 3) {
            this.state.errors.title = 'Title must be at least 3 characters';
            formIsValid = false;
        }
        if (this.state.course.category.length < 3) {
            this.state.errors.category = 'Category must be at least 3 characters';
            formIsValid = false;
        }
        if (this.state.course.length.length < 3) {
            this.state.errors.length = 'Length must be at least 3 characters';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    saveCourse: function(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }

        this.setState({dirty: false});
        toastr.success('Course saved.');
        this.transitionTo('courses');
    },

    render: function() {
        return (
            <CourseForm
                course={this.state.course}
                onChange={this.setCourseState}
                onSave={this.saveCourse}
                errors={this.state.errors} />
        );
    }
});

module.exports = ManageCoursePage;
