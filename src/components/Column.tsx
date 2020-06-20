import React from 'react';
import Square, { SquareDefinition } from './Square';
import './Column.css';

export interface ColumnProps {
  squareDefinitions: SquareDefinition[];
  group: string;
  startingIndex: number;
  onSquareChange: (index: number, value: boolean) => void;
}

const Column = ({
  squareDefinitions,
  group,
  startingIndex,
  onSquareChange,
}: ColumnProps) => {
  return (
    <fieldset className="c-bc-column">
      <legend className="c-bc-column__heading">
        <span className="c-bc-column__heading-text">{group}</span>
      </legend>
      {squareDefinitions.map((squareDefinition, index) => {
        return (
          <Square
            squareDefinition={squareDefinition}
            index={startingIndex + index}
            group={group}
            onChange={onSquareChange}
            key={`${group}${squareDefinition.squareNumber}`}
          />
        );
      })}
    </fieldset>
  );
};

export default Column;
