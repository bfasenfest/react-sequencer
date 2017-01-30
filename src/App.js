import React, { Component } from 'react';
import './App.css';
import Steps from './Steps';
import TempoController from './TempoControl';
import VolController from './VolControl';

const defaultState = {
    steps: 16,
    tempo: 100,
    volume: 50,
    currentBeat: 0,
    beatLength: 0.25,
    playing: false,
    empty: false,
    reverse: false,
    randomize: false
};

class App extends Component {
  constructor () {
      super();
      this.state = defaultState;
  }

  componentDidMount () {
    this.startTempoTimer();
  }

  startTempoTimer () {
    // TODO: use requestAnimationFrame for performance
    if (!this.state.playing) return;
    let beat = () => {
        this.setState({ currentBeat: this.state.currentBeat + 1 });
        this.setState({ empty: false});
        this.setState({ randomize: false});
        // call the next beat

        let beatLength = this.state.beatLength;
        let bpm = this.state.tempo / beatLength;
        let bps = bpm / 60;
        let bpms = bps / 1000;
        let mspb = 1 / bpms;
        if (this.state.playing) setTimeout(beat, mspb);
    };

    beat();
  }

  tempoChangeHandler(tempo){
    this.setState({tempo});
  }

  volChangeHandler(volume){
    this.setState({volume});
  }

  inputBeatLength(event){
    if (event.key === 'Enter'){
      let beatLength = event.target.value;
      console.log(beatLength);
      this.setState({beatLength});
    }
  }

  selectBeathLength(event){
    let beatLength = parseFloat(event.target.value);
    this.setState({beatLength});
  }

  inputStepCount(event, prop){
    if (event.key === 'Enter'){
      let steps = event.target.value;
      console.log(steps);
      this.setState({steps});
    }
  }

  render() {
    let buttonText = this.state.playing ? "Stop" : "Start";
    return (
      <div className="App">
        <div className="App-header">
          <h2>sSeq-8000</h2>

          <div className="controllers">

          <button
            className="button"
            onClick={() => {
                // Q: WHY DOESN'T THIS WORK?
                // let playing = !this.state.playing;
                // this.setState({playing})
                this.state.playing = !this.state.playing;
                this.startTempoTimer();
              }}>
          {buttonText}
          </button>

            <TempoController
              tempo={this.state.tempo}
              changeHandler={this.tempoChangeHandler.bind(this)}
            />

            <VolController
              volume={this.state.volume}
              changeHandler={this.volChangeHandler.bind(this)}
            />

            <div> <p>Enter Beat Length </p>
              <input className="input" type="text" defaultValue={this.state.beatLength} onKeyPress={this.inputBeatLength.bind(this)}>
              </input>
            </div>

            <div> <p>Select Beat Length </p>
              <select className="input" defaultValue='0.25' onChange={this.selectBeathLength.bind(this)}>
              <option value="1">1</option>
              <option value="0.5">1/2</option>
              <option value="0.25">1/4</option>
              <option value="0.125">1/8</option>
              <option value="0.0625">1/16</option>
              <option value="0.03125">1/32</option>
              </select>
            </div>

            <div> <p>Enter Step Count </p>
              <input className="input" type="text" defaultValue={this.state.stepCount} onKeyPress={this.inputStepCount.bind(this)}>
              </input>
            </div>

            <button
              className="button"
              onClick={() => {
                  this.state = defaultState;
                }}>
            Reset
            </button>

            <button
              className="button"
              onClick={() => {
                  let empty = true;
                  this.setState({empty});
                }}>
            Clear
            </button>

            <button
              className="button"
              onClick={() => {
                  let reverse = !this.state.reverse;
                  this.setState({reverse: reverse});
                }}>
            Reverse
            </button>

            <button
              className="button"
              onClick={() => {
                  this.setState({randomize: true});
                }}>
            Randomize
            </button>


          </div>
        </div>

        <Steps
            stepCount={this.state.steps}
            volume={this.state.volume}
            currentBeat={this.state.currentBeat}
            empty={this.state.empty}
            reverse={this.state.reverse}
            randomize={this.state.randomize}
        />
      </div>
    );
  }
}

export default App;
