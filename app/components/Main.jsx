var React = require('react');
var ReactDOM = require('react-dom');


var cellStates = {
	0 : "#eeeeee",
	1 : "#d6e685",
	2 : "#8cc665",
	3 : "#44a340",
	4 : "#1e6823"
};




var mouseIsDown = false;



var exampleDataStructure = [
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
		return {
			data:[], 
			horiz: 52, 
			vert: 7,
			size: 22,
			padding: 1
		}
	},
	render: function(){
		return (
			<div>
				<div>
					<GridArea data={this.state}/>
				</div>
				<div>
					<ToolsArea data={this.state} />
				</div>
			</div>
		)
	}
});


var ToolsArea = React.createClass({
	getInitialState: function(){
		var radios = [];
		var k = 0;
		radios.push(<label htmlFor="auto"><input type="radio" name="ctrl" id="auto" value="auto" defaultChecked />Cycle Colors</label>);

		for(var prop in cellStates){
			k = k + 1;
			radios.push(
				<label htmlFor={cellStates[prop]}>
					<input type="radio" name="ctrl" id={cellStates[prop]} value={prop} />
					<span style={{backgroundColor: cellStates[prop]}}>{cellStates[prop]}</span>
				</label>
			);
		}
		return {radios};
	},
	render: function(){
		return (
			<div>
				{this.state.radios.map(function(item, eye) {
					return (
						<span key={eye} style={{marginRight: '20px'}}>
							{item}
						</span>
					);
				})}
			</div>
		)
	}
});


//$(document).on('mousedown', function() {
//	mouseIsDown = true;
//});
//
//$(document).on('mouseup', function() {
//	mouseIsDown = false;
//});



function getRadioValue(groupName) {
	var radios = document.getElementsByName(groupName);
	var retValue = 'auto';
	for (var i=0; i<radios.length; i++) {
		var someRadio = radios[i];
		if (someRadio.checked) {
			retValue = someRadio.value;
		}
	}
	return retValue;

}


var GridArea = React.createClass({
	getInitialState: function(){
		var Grid = [];
		var rowz = 0;
		for (var z = 0; z < this.props.data.vert; z++) {
			if(z !== 0){
				rowz = rowz + (this.props.data.size +(this.props.data.padding * 2));
			}
			Grid.push(<Row id={z} row={rowz} key={z} data={this.props.data} />);
		}
		return {data:[], Grid};
	},



	getSize : function(x){
		var i = (this.props.data.size +(this.props.data.padding * 2));
		return (i * x);
	},
	render: function(){
		return (
			<svg  width={this.getSize(this.props.data.horiz)} height={this.getSize(this.props.data.vert)}>
				{this.state.Grid.map(function(item, eye) {
					return item;
				})}
			</svg>
		)
	}
});


var Row = React.createClass({
	getInitialState: function(){
		var gridSection = [];
		var colz = 0;
		var z = this.props.id;
		var rowz = this.props.row;
		for (var i = 0; i < this.props.data.horiz; i++) {
			if(i !== 0){
				colz = colz + (this.props.data.size +(this.props.data.padding * 2));
			}
		    gridSection.push(<Cell key={z+'-'+i} x={colz} y={rowz} data={this.props.data} id={z+'-'+i} />);
		}
		return {data:[], gridSection};
	},
	render: function() {
		return (
			<g id={this.props.id}>
				{this.state.gridSection.map(function(item, eye) {
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

		var radio_state = getRadioValue('ctrl');

		if (radio_state === 'auto') {
			var i = this.state.CurrentState + 1;
			if (!cellStates[i]) {
				i = 0;
			}
			this.setState({CurrentState: i});
		} else {
			this.setState({CurrentState: radio_state});
		}
	},
	render: function() {

		console.log(this);
		return (
			<rect
				id		= {this.props.id}
				x		= {this.props.x}
				y		= {this.props.y}
				onClick	= {this.onChangeState}
				fill	= {cellStates[this.state.CurrentState]}
				height	= {this.props.data.size}
				width	= {this.props.data.size}
			/>
			  );
	}
});



ReactDOM.render(<Main />, document.getElementById('app'));