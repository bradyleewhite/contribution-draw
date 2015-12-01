
var React = require('react');
var ReactDOM = require('react-dom');



var App = require('./components/App.jsx');


console.log(App);



var Entry = React.createClass({
    render: function() {
        return <App />;
    }
});

ReactDOM.render(<Entry />, document.querySelector("#app"));
