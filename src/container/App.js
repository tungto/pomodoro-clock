import './App.css';
import React, { Component } from 'react';
import ControlBoard from '../components/ControlBoard/ControlBoard';
import DisplayBoard from '../components/DisplayBoard/DisplayBoard';
import ReactFCCtest from 'react-fcctest';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervals: {
        break: 5,
        session: 25,
      },
      isSession: true,
      isRunning: false,
      pausedTime: null,
      time: '25:00',
    };
    this.interValTypes = Object.keys(this.state.intervals);
  }

  adjustTimeLength = (e) => {
    const adjustBtnID = e.target.id;
    const [type, direction] = adjustBtnID.split('-');
    const intervals = { ...this.state.intervals };

    direction === 'increment' ? intervals[type]++ : intervals[type]--;

    if (intervals[type] >= 1 && intervals[type] <= 60) {
      this.setState({ intervals });
      if (type === 'session') {
        this.setState({ time: `${this.formatTime(intervals[type])}:00` });
      }
    }
  };

  formatTime = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  getSeconds = (e) => {
    const { pausedTime } = this.state;
    return pausedTime ? parseInt(pausedTime[1]) : 0;
  };

  getMinutes = () => {
    const { pausedTime, isSession, intervals } = this.state;
    return pausedTime
      ? parseInt(pausedTime[0])
      : isSession
      ? intervals.session
      : intervals.break;
  };

  countDown = () => {
    this.setState({ isRunning: true });
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();

    this.interval = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          this.setState({ isSession: !this.state.isSession });
          this.controlAudio('play');

          // get munites and second of new interval Type
          minutes = this.getMinutes();
          seconds = this.getSeconds();
        }
      }

      this.setState({
        time: `${this.formatTime(minutes)}:${this.formatTime(seconds)}`,
      });
    }, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
    this.setState({ isRunning: false, pausedTime: this.state.time.split(':') });
  };

  controlAudio = (action) => {
    const audio = document.getElementById('beep');
    if (action === 'rewind') {
      audio.currentTime = 0;
    } else {
      // awesome!!!!
      audio[action]();
    }
  };

  reset = () => {
    clearInterval(this.interval);
    this.controlAudio('pause');
    this.controlAudio('rewind');
    this.setState({
      intervals: {
        break: 5,
        session: 25,
      },
      isSession: true,
      isRunning: false,
      pausedTime: null,
      time: '25:00',
    });
  };

  render() {
    const controlBoards = this.interValTypes.map((type) => {
      return (
        <ControlBoard
          type={type}
          handleClick={this.adjustTimeLength}
          key={type}
          length={this.state.intervals[type]}
        />
      );
    });

    return (
      <div className='App'>
        <ReactFCCtest />
        <h1>Pomodoro Clock</h1>
        <div className='ControlBoards'>{controlBoards}</div>

        <DisplayBoard
          interval={
            this.state.isSession ? this.interValTypes[0] : this.interValTypes[1]
          }
          reset={this.reset}
          time={this.state.time}
          start={this.countDown}
          isRunning={this.state.isRunning}
          pause={this.pause}
        />
      </div>
    );
  }
}

export default App;
