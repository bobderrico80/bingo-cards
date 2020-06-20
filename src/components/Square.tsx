import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
import './Square.css';

export interface SquareDefinition {
  squareNumber: number;
  marked: boolean;
}

export interface SquareProps {
  squareDefinition: SquareDefinition;
  group: string;
  index: number;
  onChange: (index: number, value: boolean) => void;
}

const Square = ({ squareDefinition, index, onChange, group }: SquareProps) => {
  const { squareNumber, marked } = squareDefinition;
  const id = `${group}${squareNumber}`;
  const freeSpace = squareNumber === 0;
  const squareText = freeSpace ? 'FREE' : String(squareNumber);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(index, event.currentTarget.checked);
  };

  return (
    <div className="c-bc-square">
      <input
        id={id}
        className="c-bc-square__checkbox"
        type="checkbox"
        checked={marked}
        aria-label={id}
        onChange={handleChange}
      />
      {marked && (
        <span className="c-bc-square__marker" aria-hidden={true}></span>
      )}
      <label htmlFor={id} className="c-bc-square__label">
        <span
          className={classnames('c-bc-square__text', {
            'c-bc-square__text--free': freeSpace,
          })}
        >
          {squareText}
        </span>
      </label>
    </div>
  );
};

export default Square;
