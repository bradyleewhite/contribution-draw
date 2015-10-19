var App = require('./container/App');
var React = require('react');



// var swig  = require('swig');
// swig.renderFile('/path/to/template.html', {
//     pagename: 'awesome people',
//     authors: ['Paul', 'Jim', 'Jane']
// });


React.render(<App />, document.getElementsByTagName('content')[0]);