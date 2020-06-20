import { SquareDefinition } from '../components/Square';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getColumnNumbers = (
  startingNumber: number,
  endingNumber: number,
  columnSize: number
): number[] => {
  if (endingNumber - startingNumber + 1 < columnSize) {
    throw new Error('Range is too small for column size');
  }

  const columnNumbers = new Set<number>();

  while (columnNumbers.size < columnSize) {
    const nextNumber = getRandomInt(startingNumber, endingNumber + 1);
    columnNumbers.add(nextNumber);
  }

  return Array.from(columnNumbers.values());
};

export const getStandardBoardNumbers = (): number[] => {
  const bColumn = getColumnNumbers(1, 15, 5);
  const iColumn = getColumnNumbers(16, 30, 5);
  const nColumn = getColumnNumbers(31, 45, 4);
  const gColumn = getColumnNumbers(46, 60, 5);
  const oColumn = getColumnNumbers(61, 75, 5);

  // handle free space with a '0'
  nColumn.splice(2, 0, 0);

  return [...bColumn, ...iColumn, ...nColumn, ...gColumn, ...oColumn];
};

export const getSquareDefinitions = (
  columnNumbers: number[]
): SquareDefinition[] => {
  return columnNumbers.map((columnNumber) => {
    return {
      squareNumber: columnNumber,
      marked: false,
    };
  });
};

export const groupSquareDefinitions = (
  squareDefinitions: SquareDefinition[],
  squaresPerGroup: number
) => {
  return squareDefinitions.reduce(
    (groups: SquareDefinition[][], squareDefinition, index) => {
      if (index % squaresPerGroup === 0) {
        return [...groups, [squareDefinition]];
      }

      groups[groups.length - 1].push(squareDefinition);

      return groups;
    },
    []
  );
};

export const encodeBoard = (squareDefinitions: SquareDefinition[]): string => {
  return squareDefinitions.reduce((encoded, squareDefinition) => {
    return `${encoded}${squareDefinition.squareNumber}${
      squareDefinition.marked ? 'x' : 'o'
    }`;
  }, '');
};

export const decodeBoard = (encoded: string): SquareDefinition[] => {
  const SQUARE_REGEX = '\\d+[xo]';
  const matchedString = encoded.match(new RegExp(`(${SQUARE_REGEX}){1,}`, 'g'));

  if (!matchedString || matchedString[0].length !== encoded.length) {
    return [];
  }

  const possibleMatches = encoded.match(new RegExp(SQUARE_REGEX, 'g'));

  if (!possibleMatches) {
    return [];
  }

  return possibleMatches.map((match) => {
    const marked = match.endsWith('x');
    const squareNumber = parseInt(match.replace(/[xo]/, ''), 10);

    return { marked, squareNumber };
  });
};
