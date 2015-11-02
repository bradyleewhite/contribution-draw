
var React = require('react');


var cellStates = {
	0 : "#eeeeee",
	1 : "#d6e685",
	2 : "#8cc665",
	3 : "#44a340",
	4 : "#1e6823"
}

var Cell = React.createClass({
	getInitialState: function(){
		return {state:0, color: cellStates[0]}
	},
	onStateChange: function(e){
		var i = e.target.state + 1;
		if(!cellStates[i]){
			i = 0;
		}
		this.setState({state:i, color: cellStates[i]});
	},
	render: function() {
		return (
			<div class="cell-container">
				<CellState state={this.state} onChange={this.onStateChange} />
			</div>


		);
	}
});


var CellState React.createClass({
	render: function() {
		return (
			
				<CellState />
			


		);
	}
});

module.exports = HelloSayer;