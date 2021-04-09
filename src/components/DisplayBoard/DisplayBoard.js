import React from 'react';

function DisplayBoard(props) {
  return (
    <div id='display-board'>
      <h1 id='timer-label'>{props.interval.toUpperCase()}</h1>
      <p>Time Left</p>
      <h2 id='time-left'>{props.time}</h2>
      <button
        id='start_stop'
        onClick={props.isRunning ? props.pause : props.start}
      >
        &#x22B5;
      </button>
      <button id='reset' onClick={props.reset}>
        &#x21ba;
      </button>

      <audio
        id='beep'
        type='audio/mpeg'
        src='https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
      />
    </div>
  );
}

export default DisplayBoard;
