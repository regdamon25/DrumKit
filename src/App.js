import React, { Component } from 'react';
import './App.css';

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
keyCode: 81,
keyTrigger: 'Q',
id: 'Chord-1',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
keyCode: 87,
keyTrigger: 'W',
id: 'Chord-2',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
keyCode: 69,
keyTrigger: 'E',
id: 'Chord-3',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
keyCode: 65,
keyTrigger: 'A',
id: 'Shaker',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
keyCode: 83,
keyTrigger: 'S',
id: 'Open-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
keyCode: 68,
keyTrigger: 'D',
id: 'Closed-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
keyCode: 90,
keyTrigger: 'Z',
id: 'Punchy-Kick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
keyCode: 88,
keyTrigger: 'X',
id: 'Side-Stick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
keyCode: 67,
keyTrigger: 'C',
id: 'Snare',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

const activeStyle = {
  backgroundColor: '#3e8e41',
  boxShadow:'0 5px #fff',


}

const inactiveStyle = {
backgroundImage:'linear-gradient(to right, #193c4c, #6e6d75)',
boxShadow:'0 3px #666',
marginTop:'10px',

    
}



class DrumPad extends Component{
  constructor(props){
    super(props);
    this.state = {
      padStyle:inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if(e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if(this.props.power) {
      this.state.padStyle.backgroundColor === '#3e8e41' ?
      this.setState({
        padStyle: inactiveStyle
      }) :
      this.setState({
        padStyle: activeStyle
      }) ;
    }else {
      this.state.padStyle.transform === "translateY(4px)" ?
      this.setState({
        padStyle: inactiveStyle
      }) : 
      this.setState({
        padStyle: {
          transform: 'translateY(4px)',
          boxShadow: '0 5px linear-gradient(to right, #193c4c, #6e6d75)'  
        }
      });
    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div id = {this.props.clipId}
      onClick={this.playSound}
      className="drum-pad"
      style={this.state.padStyle} >
      <audio className = 'clip' id = {this.props.keyTrigger} src= {this.props.clip}></audio>
      {this.props.keyTrigger}
      </div>
    )
  }
}

class PadBank extends Component{
  constructor(props){
    super(props);
  }
  render() {
    let padBank;
    this.props.power ?
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) =>{
      return (
        <DrumPad
        clipId ={padBankArr[i].id}
        clip ={padBankArr[i].url}
        keyTrigger ={padBankArr[i].keyTrigger}
        keyCode ={padBankArr[i].keyCode}
        updateDisplay ={this.props.updateDisplay}
        power ={this.props.power} /> 
      )
    }) :
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return (
        <DrumPad
        clipId ={padBankArr[i].id}
        clip ='#'
        keyTrigger ={padBankArr[i].keyTrigger}
        keyCode ={padBankArr[i].keyCode}
        updateDisplay ={this.props.updateDisplay}
        power ={this.props.power} /> 
      )
    });
    return (
      <div className = "pad-bank" >
      {padBank}
      </div>
    )
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: "Heater Kit",
      sliderVal: 0.3
    }
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    this.setState({
      power:!this.state.power,
      display: String.fromCharCode(160)
    });
  }
  selectBank() {
    if(this.state.power) {
      this.state.currentPadBankId ==="Heater Kit" ?
      this.setState({
        currentPadBank: bankTwo,
        display: "Smooth Piano Kit", 
        currentPadBankId: "Smooth Piano Kit"
      }) :
      this.setState({
        currentPadBank: bankOne,
        display: "HeaterKit", 
        currentPadBankId: "Heater Kit",
      })
    }
  }
  displayClipName(name) {
    if(this.state.power) {
      this.setState({
        display: name
      });
    }
  }
  adjustVolume(e) {
    if(this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100)
      });
      setTimeout(()=> this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display:String.fromCharCode(160)
    });
  }
  render() {
    const clips= [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal
    });
    return (
      <div id="drum-machine" className='drum_pad_container'> 
        <div className="pad-container">
        <PadBank 	
					power={this.state.power}
					updateDisplay={this.displayClipName}
					clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank} />
        </div>
        <div id="control_panel">
        <span><h1>Power</h1></span>
        <div className="controls">
        <label id="power_button">
        <input type="checkbox" id="background_button"/>
        <span className="toggle_round" onClick={this.powerControl}></span>
        </label>
        
        
      
        <div id="display">{this.state.display}</div>
        <div id="slide_container">
        <input type="range" min="0" max="1" step="0.01" value={this.state.sliderVal} onChange={this.adjustVolume} className="slider" id="myRange" />
        </div>
        <label id="bank"><input type="checkbox"/><span className="toggle_round" onClick={this.selectBank}></span></label>
        <span><h1 id="bank_label">Bank</h1></span>
        </div>
        </div>
        </div>
    );
  }
}



export default App;
