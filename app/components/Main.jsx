var React = require('react');
var ReactDOM = require('react-dom');


var cellStates = {
	0 : "#eeeeee",
	1 : "#d6e685",
	2 : "#8cc665",
	3 : "#44a340",
	4 : "#1e6823"
};


var exampleDataStructure = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

//console.log('exampleDataStructure',exampleDataStructure);

var mouseIsDown = false;

var fuck;

var Main = React.createClass({
	getInitialState: function(){
		return {
			data:[],
			horiz: 52,
			vert: 7,
			size: 20,
			smallGrid: 13,
			largeGrid: 20,
			padding: 1,
			mouseDown: false
		}
	},
	updateReturnValue: function (row, cell, val){

		var gitSet = this.gitData[row][cell] = val;


		this.setState(gitSet);
	},
	resetGrid: function (){
		//console.log(this.props);
	},
	onSizeChange: function (event){
		this.setState({size:  parseInt(event.target.value)});
	},


	render: function(){

		var sm = (this.state.smallGrid === this.state.size) ? 'btn btn-default active': 'btn btn-default';
		var lg = (this.state.largeGrid === this.state.size) ? 'btn btn-default active': 'btn btn-default';
		return (
			<div>
				<div className="page-header">
					<div className={'btn-group'} role="group">
						<button type="button"
								className={sm}
								value={this.state.smallGrid}
								onClick={this.onSizeChange}>
							Small
						</button>
						<button type="button"
								className={lg}
								value={this.state.largeGrid}
								onClick={this.onSizeChange}>
							Large
						</button>
					</div>
				</div>

				<div>
					<GridArea data={this.state}/>
				</div>
				<div>
					<Radios data={this.state} />
					<br />
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
		var grid = [];
		for (var y = 0; y < this.props.data.vert; y++) {
			var row = [];
			for (var x = 0; x < this.props.data.horiz; x++) {
				row.push({value:0});
			}
			grid.push(row);
		}
		return {grid}
	},
	getSize : function(x){
		var i = (this.props.data.size +(this.props.data.padding * 2));
		return (i * x);
	},
	updateValue: function(row, cell, value){

	},
	render: function(){
		var prop = this.props,
		offSet = this.props.data.size +(this.props.data.padding * 2),
		yPos = (0 - offSet);
		return (
			<svg width={this.getSize(this.props.data.horiz)} height={this.getSize(this.props.data.vert)}>
				{this.state.grid.map(function(Row, i) {
					var xPos = (0 - offSet);
					yPos += offSet;
					return (
						<g id={i} key={i}>
							{Row.map(function(item2, eye2) {
								return (<Cell
									key			= {i+'-'+eye2}
									rowCount	= {i}
									cellCount	= {eye2}
									x			= {xPos += offSet}
									y			= {yPos}
									data		= {prop.data}
									id			= {i+'-'+eye2}
									value		= {item2.value}
								/>);
							})}
						</g>
					)
				})}
			</svg>
		)
	}
});


var Cell = React.createClass({
	getInitialState: function(){
		return {
			CurrentState:0
		}
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
		console.log('this ',this);
		//[this.props.value = next_state;

		//exampleDataStructure[this.props.rowCount][this.props.cellCount] = next_state;
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
//console.log('********************************************************',this.props);
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
			value 		= {this.state.CurrentState}
		/>);
	}
});



ReactDOM.render(<Main />, document.getElementById('app'));