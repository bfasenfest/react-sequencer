import React, { Component, PropTypes } from 'react';
import './Steps.css';
import Step from './Step';

export default class Steps extends Component {
  static propTypes = {
    stepCount: PropTypes.number.isRequired,
    currentBeat: PropTypes.number.isRequired
  };

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    let stepCount = this.props.stepCount;
    let currentStep = this.props.currentBeat % stepCount;
    if (currentStep === 0){
      document.body.style.background = this.getRandomColor();
    }
    let steps = [];
    let activeTest = !this.props.reverse ? currentStep : stepCount - currentStep - 1;
    for (let i = 0; i < stepCount; i++) {

        let step = <Step active={i === activeTest} key={i} volume={this.props.volume} empty={this.props.empty} randomize={this.props.randomize} />
        steps.push(step);
    }

    return (
      <div className="Steps">
        {steps}
      </div>
    );
  }
}
