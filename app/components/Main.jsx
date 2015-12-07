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


var Main = React.createClass({
	getInitialState: function(){
		return {
			horiz: 52,
			vert: 7,
			size: 20,
			smallGrid: 13,
			largeGrid: 20,
			padding: 1,
			mouseDown: false,
			rightClick: false,
			cellStates : {
				0 : "#eeeeee",
				1 : "#d6e685",
				2 : "#8cc665",
				3 : "#44a340",
				4 : "#1e6823"
			}
		}
	},
	resetGrid: function (){
		alert("Sorry, Brady hasn't added any code to make work yet.");
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
					<GridArea data={this.state} />
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
		radios.push(<label htmlFor="auto"><input type="radio" name="ctrl" id="auto" value="auto" defaultChecked />Cycle Colors</label>);
		for(var prop in this.props.data.cellStates){
			radios.push(
				<label htmlFor={this.props.data.cellStates[prop]}>
					<input type="radio" name="ctrl" id={this.props.data.cellStates[prop]} value={prop} />
					<span style={{backgroundColor: this.props.data.cellStates[prop]}}>{this.props.data.cellStates[prop]}</span>
				</label>
			);
		}
		return {radios};
	},
	render: function(){
		return (
			<div>
				{this.state.radios.map(function(item, i) {
					return (
						<span key={i} style={{marginRight: '20px'}}>
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
		var exportData = [];
		for (var y = 0; y < this.props.data.vert; y++) {
			var row = [];
			for (var x = 0; x < this.props.data.horiz; x++) {
				row.push({
					key: (y+'-'+x),
					row_id: y,
					cell_id: x
				});
			}
			grid.push(row);
		}

		return {
			grid: grid,
			mouseDown:false
		}
	},
	getSize: function(x){
		var i = (this.props.data.size +(this.props.data.padding * 2));
		return (i * x);
	},
	onMouseLeave: function(){
		this.props.data.mouseDown = false;
		this.props.data.rightClick = false;
	},
	render: function(){
		var offSet = this.props.data.size +(this.props.data.padding * 2),
		yPos = (0 - offSet);
		return (
			<svg
				width={this.getSize(this.props.data.horiz)}
				height={this.getSize(this.props.data.vert)}
				onMouseLeave={this.onMouseLeave}>
				{this.state.grid.map(function(Row, i) {
					var xPos = (0 - offSet);
					yPos += offSet;
					return (
						<g id={i} key={i}>
							{Row.map(function(cell, x) {
								return (<Cell
									key			= {cell.key}
									row			= {cell.row_id}
									cell		= {cell.cell_id}
									x			= {xPos += offSet}
									y			= {yPos}
									data		= {this.props.data}
									id			= {cell.key}
								/>);
							}.bind(this))}
						</g>
					)
				}.bind(this))}
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
			if (!this.props.data.cellStates[next_state]) {
				next_state = 0;
			}
		} else {
			next_state = radio_state;
		}
		this.setState({CurrentState: next_state});
	},
	onMouseEnter: function(){
		if (this.props.data.mouseDown){
			if(this.props.data.rightClick) {
				this.setState({CurrentState: 0});
			}else {
				this.onChangeState();
			}
		}
	},
	onMouseDown: function(e){
		this.props.data.mouseDown = true;
		if(e.button === 0) {
			this.onChangeState();
		}
	},
	onMouseUp: function(){
		this.props.data.mouseDown = false;
		this.props.data.rightClick = false;
	},
	contextMenu:function(e){
		e.preventDefault();
		this.props.data.rightClick = true;
		this.setState({CurrentState: 0});
	},
	render: function() {
		return (<rect
				id				= {this.props.id}
				x				= {this.props.x}
				y				= {this.props.y}
				style			= {{strokeWidth: this.props.data.padding + 'px', stroke: '#ffffff'}}
				onMouseEnter	= {this.onMouseEnter}
				onMouseDown 	= {this.onMouseDown}
				onMouseUp 		= {this.onMouseUp}
				onContextMenu	= {this.contextMenu}
				fill			= {this.props.data.cellStates[this.state.CurrentState]}
				height			= {this.props.data.size}
				width			= {this.props.data.size}
				value 			= {this.state.CurrentState}
		/>);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'));