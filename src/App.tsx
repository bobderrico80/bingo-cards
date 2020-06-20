import React, { useState, useEffect } from 'react';
import {
  getSquareDefinitions,
  getStandardBoardNumbers,
  encodeBoard,
  decodeBoard,
} from './modules/utils';
import './App.css';
import Board from './components/Board';

const getNewBoard = () => {
  return getSquareDefinitions(getStandardBoardNumbers());
};

const App = () => {
  const [squareDefinitions, setSquareDefinitions] = useState(getNewBoard());

  useEffect(() => {
    const encodedState = new URLSearchParams(window.location.search).get('s');

    if (encodedState) {
      const decodedBoard = decodeBoard(encodedState);

      if (decodedBoard.length === 25) {
        setSquareDefinitions(decodedBoard);
      }
    }
  }, []);

  const handleSquareChange = (indexToUpdate: number, value: boolean) => {
    setSquareDefinitions((currentSquareDefinitions) => {
      return currentSquareDefinitions.map((squareDefinition, index) => {
        if (index === indexToUpdate) {
          return {
            ...squareDefinition,
            marked: value,
          };
        }

        return squareDefinition;
      });
    });
  };

  const handleClearBoard = () => {
    if (window.confirm('Clear all markings from your board?')) {
      setSquareDefinitions((previousSquareDefinitions) => {
        return previousSquareDefinitions.map((squareDefinition) => {
          return {
            ...squareDefinition,
            marked: false,
          };
        });
      });
    }
  };

  const handleNewBoard = () => {
    if (
      window.confirm(
        'Are you sure you want a new board? You will lose your old board!'
      )
    ) {
      setSquareDefinitions(getNewBoard());
    }
  };

  const handleBoardCopy = () => {
    const { origin, pathname } = window.location;
    const url = `${origin}${pathname}?s=${encodeBoard(squareDefinitions)}`;

    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Board link copied to clipboard!');
  };

  return (
    <div className="c-bc-app">
      <Board
        squareDefinitions={squareDefinitions}
        onSquareChange={handleSquareChange}
      />
      <button className="c-bc-app__button" onClick={handleClearBoard}>
        Clear Board
      </button>
      <button className="c-bc-app__button" onClick={handleNewBoard}>
        New Board
      </button>
      <button className="c-bc-app__button" onClick={handleBoardCopy}>
        Copy Board Link
      </button>
    </div>
  );
};

export default App;
