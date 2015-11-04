var React = require('react');
var ReactDOM = require('react-dom');




var cellStates = {
	0 : "#eeeeee",
	1 : "#d6e685",
	2 : "#8cc665",
	3 : "#44a340",
	4 : "#1e6823"
};


var DataStruct = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];




var Main = React.createClass({
	getInitialState: function(){
		return {data:[], horiz: this.props.hCount, vert: this.props.vCount}
	},
	render: function(){
		return (<Group data={this.props}/>)
	}
});

var Group = React.createClass({
	getInitialState: function(){
		var theGrid = [];
		var rowz = 0;
		for (var z = 0; z < this.props.data.vCount; z++) {
			if(z !== 0){
				rowz = rowz + 13;
			}
			var gridSection = [];
			var colz = 0;
			for (var i = 0; i < this.props.data.hCount; i++) {
				if(i !== 0){
					colz = colz + 13;
				}
			    gridSection.push(<Cell key={z+'-'+i} x={colz} y={rowz} id={z+'-'+i} />);
			}
			theGrid.push(<Row id={z} key={z} data={gridSection} />);
		}
		return {theGrid};
	},
	render: function(){
		return (
			<svg width="721" height="110">
				{this.state.theGrid.map(function(item, eye) {
					return item;
					
				})}
			</svg>
		)
	}
});


var Row = React.createClass({

	render: function() {
		return (
			<g id={this.props.id}>
				{this.props.data.map(function(item, eye) {
					return item;
				})}
			</g>
		)
	}
});


var Cell = React.createClass({
	getInitialState: function(){
		return {CurrentState:0}
	},
	onChangeState: function (e){
		var i = this.state.CurrentState + 1;
		if(!cellStates[i]){
			i = 0;
		}
		this.setState({CurrentState:i});
	},
	render: function() {
		return (
			<rect id={this.props.id} x={this.props.x} y={this.props.y} onClick={this.onChangeState} fill={cellStates[this.state.CurrentState]} height={11} width={11}></rect>
			);
	}
});






ReactDOM.render(<Main hCount={52} vCount={7} />, document.getElementById('app'));