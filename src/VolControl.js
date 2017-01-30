import React, { Component, PropTypes } from 'react';


export default class VolController extends Component {

  static propTypes = {
    // volume: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);

    let {
      min = 0,
      max = 100,
      volume = 50
    } = this.props;



    this.state = {
      min,
      max,
      volume
    };
  }

  render () {
    let className = 'vol-slider';
    // let style = {};

    return (
      <div className={className}>
        <div> volume: {this.props.volume} </div>
        <input
          type="range"
          min={this.state.min}
          max={this.state.max}
          // defaultValue={this.props.volume}
          value={this.props.volume}
          onChange={ (event) => {
            let volume = event.target.value;
            this.props.changeHandler(volume)}}
            >
        </input>
      </div>

    )
  }
}
