
var React = require('react');
var ReactDOM = require('react-dom');




var Entry = React.createClass({
    render: function() {
        return <App />;
    }
});

ReactDOM.render(<Entry />, document.querySelector("#app"));
