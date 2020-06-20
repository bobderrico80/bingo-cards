import React from 'react';
import { SquareDefinition } from './Square';
import Column from './Column';
import './Board.css';
import { groupSquareDefinitions } from '../modules/utils';

const SQUARES_PER_COLUMN = 5;
const COLUMN_GROUPS = ['B', 'I', 'N', 'G', 'O'];

export interface BoardProps {
  squareDefinitions: SquareDefinition[];
  onSquareChange: (index: number, value: boolean) => void;
}

const Board = ({ squareDefinitions, onSquareChange }: BoardProps) => {
  const groupedSquareDefinitions = groupSquareDefinitions(
    squareDefinitions,
    SQUARES_PER_COLUMN
  );

  return (
    <form className="c-bc-board">
      {groupedSquareDefinitions.map((squareDefinitions, index) => {
        return (
          <Column
            squareDefinitions={squareDefinitions}
            group={COLUMN_GROUPS[index]}
            startingIndex={index * SQUARES_PER_COLUMN}
            onSquareChange={onSquareChange}
            key={COLUMN_GROUPS[index]}
          />
        );
      })}
    </form>
  );
};

export default Board;
