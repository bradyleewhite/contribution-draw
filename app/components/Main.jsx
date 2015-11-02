var React = require('react');
var ReactDOM = require('react-dom');




var cellStates = {
	0 : "#eeeeee",
	1 : "#d6e685",
	2 : "#8cc665",
	3 : "#44a340",
	4 : "#1e6823"
};

var colCount = 52;
var rowCount = 7;



var DataStruct = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];


// 52 total in row
var dataRow = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


var Main = React.createClass({
	getInitialState: function(){
		return {data:[], horiz: this.props.hCount, vert: this.props.vCount}
	},
	render: function(){
		return <Group data={this.props}/>
	}
});


// 0, 13, 26 , 39 --- > 700ish

var Group = React.createClass({
	getInitialState: function(){
		var theGrid = {};
		var rowz = 0;
		for (var z = 0; z < rowCount; z++) {
			if(z !== 0){
				rowz = rowz + 13;
			}
			var gridSection = [];
			var colz = 0;
			for (var i = 0; i < colCount; i++) {
				if(i !== 0){
					colz = colz + 13;
				}
			    gridSection[i] = {id: z+'-'+i, x: colz, y: rowz};
			}
			theGrid[z] = gridSection;
		}
		return theGrid;
	},
	render: function(){
		var rows = this.state[0];
		return (
			<svg width="721" height="110">
				{rows.map(function(item, eye) {
					return <Cell key={item.id} data={item} />
				})}
			</svg>
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
			<rect y={this.props.data.y} x={this.props.data.x} onClick={this.onChangeState} fill={cellStates[this.state.CurrentState]} height={11} width={11}></rect>
			);
	}
});






ReactDOM.render(<Main hCount={52} vCount={7} />, document.getElementById('app'));