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



var Main = React.createClass({
	getInitialState: function(){
		return {
			data:[],
			horiz: 52,
			vert: 7,
			size: 13,
			padding: 1,
			mouseDown: false
		}
	},
	resetGrid: function (){
		console.log(this.props);
	},
	render: function(){

		return (
			<div>
				<div>
					<GridArea data={this.state}/>
				</div>
				<div>
					<Radios data={this.state} />

					<button onClick={this.resetGrid}>Clear</button>
					
				</div>
			</div>
		)
	}
});


var Radios = React.createClass({
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
				rowz = rowz + (this.props.data.size +(this.props.data.padding));
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
			<svg width={this.getSize(this.props.data.horiz)} height={this.getSize(this.props.data.vert)}>
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
				colz = colz + (this.props.data.size +(this.props.data.padding));
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
	onChangeState: function (){
		var next_state = this.state.CurrentState + 1;
		var radio_state = getRadioValue('ctrl');
		if (radio_state === 'auto') {
			if (!cellStates[next_state]) {
				next_state = 0;
			}
		} else {
			next_state = radio_state;
		}
		this.setState({CurrentState: next_state});
	},
	onMouseEnter: function(){
		if (this.props.data.mouseDown){
			this.onChangeState();
		}
	},
	onMouseDown: function(){
		this.props.data.mouseDown = true;
	},
	onMouseUp: function(){
		this.props.data.mouseDown = false;
	},
	render: function() {
		return (<rect
			id			= {this.props.id}
			x			= {this.props.x}
			y			= {this.props.y}
			style		= {{strokeWidth: this.props.data.padding + 'px', stroke: '#ffffff'}}
			onClick		= {this.onChangeState}
			onMouseEnter= {this.onMouseEnter}
			onMouseDown = {this.onMouseDown}
			onMouseUp 	= {this.onMouseUp}
			fill		= {cellStates[this.state.CurrentState]}
			height		= {this.props.data.size}
			width		= {this.props.data.size}
		/>);
	}
});



ReactDOM.render(<Main />, document.getElementById('app'));