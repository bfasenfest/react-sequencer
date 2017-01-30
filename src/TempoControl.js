import React, { Component, PropTypes } from 'react';
import './tempo.css';

export default class TempoController extends Component {
  static propTypes = {
    // tempo: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props);

    let {
      min = 50,
      max = 300,
      tempo = 120
    } = this.props;

    this.state = {
      tempo,
      min,
      max
    };
  }

  changeHandler(tempo){
    this.setState({tempo: tempo});
  }

  render () {
    let className = 'tempo-slider';
    // let style = {};

    return (
      <div className={className}>
        <div> Tempo: {this.props.tempo} </div>
        <input
          type="range"
          min={this.state.min}
          max={this.state.max}
          // defaultValue={this.props.tempo}
          value={this.props.tempo}
          onChange={ (event) => {
            let tempo = event.target.value;
            this.props.changeHandler(tempo)}}
            >
        </input>
      </div>

    )
  }
}
