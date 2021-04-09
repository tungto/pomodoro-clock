import React from 'react';

const controlBoard = (props) => {
  return (
    <div id={props.id} className='control-board'>
      <h2 id={`${props.type}-label`}>{props.type.toUpperCase()}</h2>
      <div className='length-control'>
        <button id={`${props.type}-decrement`} onClick={props.handleClick}>
          &#x2212;
        </button>
        <p id={`${props.type}-length`}>{props.length}</p>
        <button id={`${props.type}-increment`} onClick={props.handleClick}>
          &#x2b;
        </button>
      </div>
    </div>
  );
};

export default controlBoard;
