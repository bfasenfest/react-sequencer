import React, { Component, PropTypes } from 'react';
import './Step.css';

const samples = [
  '/samples/tom-lofi.wav',
  '/samples/hihat-analog.wav',
  '/samples/kick-classic.wav',
  '/samples/perc-metal.wav',
  '/samples/snare-analog.wav'
];

export default class Step extends Component {
    static propTypes = {
      active: PropTypes.bool.isRequired,
      // volume: PropTypes.number.isRequired
    };

    constructor (props) {
      super(props);
      this.state = {
        // this chooses a random sample — we'll update this in the _future_
        audioSrc: samples[Math.floor(Math.random() * samples.length)] || this.props.audioSrc,
        // Q: WHY DOESN'T THIS WORK WHEN IT CHANGES?
        volume: this.props.volume/100,
        empty: this.props.empty,
        randomize: this.props.randomize
      };
    }

    componentWillReceiveProps (nextProps) {
      // if we are about to become active, play our sample
      if (nextProps.empty === true && this.state.empty === false){
        this.setState({empty: true})
        this.setState({audioSrc: "null"});
        console.log('emptying');
        return;
      }

      if (nextProps.randomize === true){
        this.setState({randomize: true})
        let randomSample = samples[Math.floor(Math.random() * samples.length)];
        this.setState({audioSrc: randomSample});
        console.log('randomizing');
        return;
      }

      if (nextProps.active === true && this.props.active === false) {
        //console.log('play?!?!?');

        this.audioElement.src = this.state.audioSrc;
        this.audioElement.currentTime = 0;
        this.audioElement.volume = this.props.volume/100;
        if (this.state.audioSrc !== "null") this.audioElement.play();
      }
    }

    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextState.audioSrc)
    //     //this.audioElement.src = nextState.audioSrc;
    // }

    // is a function that returns a random color
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    selectSample(event){
      let audioSrc = event.target.value;
      this.setState({audioSrc});
      this.setState({empty: false});
    }

    render () {
        let className = 'Step';
        let style = {};
        if (this.props.active) {
            style.background = this.getRandomColor();
            className += ' Step-active';
        }

        let selectOptions = [<option value="null">None</option>];

        samples.forEach((sample) => {
          let sampleText = sample.slice(9,-4).toUpperCase();
          let optionText = <option value={sample}>{sampleText}</option>;
          selectOptions.push(optionText);
        });


        return (
            <div className={className} style={style} >
              <p className='step-text'> {this.state.audioSrc.slice(9,-4).toUpperCase()} </p>
              <audio preload ref={el => { this.audioElement = el; }}>
                <source src={this.state.audioSrc} type="audio/wav"  />
              </audio>
              <select className="selector" value={this.state.audioSrc} onChange={this.selectSample.bind(this)}>
              {selectOptions}
              </select>
            </div>
        );
    }
}
