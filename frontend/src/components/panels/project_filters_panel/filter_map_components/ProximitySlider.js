import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { setRangeFilter } from '../../../../actions/filters';
import { setMapZoom } from '../../../../actions/map';
const Handle = Slider.Handle;

const dotStyle = {
	'bottom': '-10px',
    'width': '1px',
    'border': '1px solid #e9e9e9',
    'borderRadius': '0%',
    'marginLeft': '-1px',
};

const displayProximityValueToolTip = ({ value, dragging, index, key, className, disabled, offset, prefixCls }) => (
	<Tooltip
		prefixCls="rc-slider-tooltip"
		overlay={value}
		visible={dragging}
		placement="top"
		key={index}>
		<Handle value={value} index={index} key={key} className={className} disabled={disabled} offset={offset} prefixCls={prefixCls}/>
	</Tooltip>
);

class ProximitySlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			minValue: 0,
			maxValue: 50,
            steps: 10
		}
	}

	marks(minValue, maxValue) {
	  let mileMarks = [];
	  for (let i = minValue; i <= maxValue; i++ ) {
	    if (i == minValue || i == maxValue || i % this.state.steps == 0) {
			mileMarks.push(i);
	    }
	  }
	 
	  return mileMarks.reduce(function(mark, value) {
	    mark[value] = {label: value + ' mi'};
	    return mark;
	  }, {});
	}

	handleProximityChange = (value) => {
		this.props.dispatch(setRangeFilter(value));
		this.props.dispatch(setMapZoom(value));
	}

	render() {
		return (
			<div className="range-container">
				<Slider 
					min={this.state.minValue}
					max={this.state.maxValue}
					step={this.state.steps}
					marks={this.marks(this.state.minValue, this.state.maxValue)}
					dotStyle={dotStyle}
					defaultValue={this.props.range}
					handle={displayProximityValueToolTip}
					onChange={(value) => { this.handleProximityChange(value)}}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
    return {
        range: state.filters.range
    }
}

export default connect(mapStateToProps)(ProximitySlider);