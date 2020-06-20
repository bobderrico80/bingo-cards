import {
  getColumnNumbers,
  getStandardBoardNumbers,
  getSquareDefinitions,
  groupSquareDefinitions,
  encodeBoard,
  decodeBoard,
} from './utils';

const getRange = (size: number, startAt: number): number[] => {
  return [...Array(size).keys()].map((i) => i + startAt);
};

describe('The utils module', () => {
  describe('getColumnNumbers() function', () => {
    it('returns an array with the expected column size', () => {
      expect(getColumnNumbers(1, 15, 5)).toHaveLength(5);
    });

    it('only includes numbers in the range', () => {
      const columnNumbers = getColumnNumbers(1, 15, 5);

      columnNumbers.forEach((columnNumber) => {
        expect(getRange(15, 1)).toContain(columnNumber);
      });
    });

    it('includes numbers in the range inclusively', () => {
      const columnNumbers = getColumnNumbers(1, 5, 5);

      columnNumbers.forEach((columnNumber) => {
        expect(getRange(5, 1)).toContain(columnNumber);
      });
    });

    it('throws an error if the range is too small for the column size', () => {
      expect(() => {
        getColumnNumbers(1, 5, 6);
      }).toThrow('Range is too small for column size');
    });
  });

  describe('getStandardBoardNumbers()', () => {
    let boardNumbers: number[];

    beforeEach(() => {
      boardNumbers = getStandardBoardNumbers();
    });

    it('contains 25 numbers', () => {
      expect(boardNumbers).toHaveLength(25);
    });

    it('contains the numbers 1-15 in positions 1 through 5', () => {
      boardNumbers.slice(0, 5).forEach((boardNumber) => {
        expect(getRange(15, 1)).toContain(boardNumber);
      });
    });

    it('contains the numbers 16-30 in positions 6 through 10', () => {
      boardNumbers.slice(5, 10).forEach((boardNumber) => {
        expect(getRange(15, 16)).toContain(boardNumber);
      });
    });

    it('contains the numbers 31-45 in positions 11 and 12', () => {
      boardNumbers.slice(10, 12).forEach((boardNumber) => {
        expect(getRange(15, 31)).toContain(boardNumber);
      });
    });

    it('contains a 0 in the 13th position', () => {
      expect(boardNumbers[12]).toEqual(0);
    });

    it('contains the numbers 31-45 in positions 14 and 15', () => {
      boardNumbers.slice(13, 15).forEach((boardNumber) => {
        expect(getRange(15, 31)).toContain(boardNumber);
      });
    });

    it('contains the numbers 46-60 in positions 16 through 20', () => {
      boardNumbers.slice(15, 20).forEach((boardNumber) => {
        expect(getRange(15, 46)).toContain(boardNumber);
      });
    });

    it('contains the numbers 61-75 in positions 21 through 25', () => {
      boardNumbers.slice(20, 25).forEach((boardNumber) => {
        expect(getRange(15, 61)).toContain(boardNumber);
      });
    });
  });

  describe('getSquareDefinitions() function', () => {
    it('returns a square definition for each number in the array, with `marked` defaulted to `false`', () => {
      expect(getSquareDefinitions([1, 2])).toEqual([
        { squareNumber: 1, marked: false },
        { squareNumber: 2, marked: false },
      ]);
    });
  });

  describe('groupSquareDefinitions() function', () => {
    it('breaks definitions into groups based on provided squares per group', () => {
      const squareDefinitions = [
        { squareNumber: 1, marked: false },
        { squareNumber: 2, marked: false },
        { squareNumber: 3, marked: false },
        { squareNumber: 4, marked: false },
        { squareNumber: 5, marked: false },
        { squareNumber: 6, marked: false },
        { squareNumber: 7, marked: false },
        { squareNumber: 8, marked: false },
        { squareNumber: 9, marked: false },
        { squareNumber: 10, marked: false },
      ];

      expect(groupSquareDefinitions(squareDefinitions, 5)).toEqual([
        [
          { squareNumber: 1, marked: false },
          { squareNumber: 2, marked: false },
          { squareNumber: 3, marked: false },
          { squareNumber: 4, marked: false },
          { squareNumber: 5, marked: false },
        ],
        [
          { squareNumber: 6, marked: false },
          { squareNumber: 7, marked: false },
          { squareNumber: 8, marked: false },
          { squareNumber: 9, marked: false },
          { squareNumber: 10, marked: false },
        ],
      ]);
    });
  });

  describe('encodeBoard() function', () => {
    it('encodes the board as expected', () => {
      expect(
        encodeBoard([
          { squareNumber: 1, marked: false },
          { squareNumber: 2, marked: true },
          { squareNumber: 3, marked: false },
        ])
      ).toEqual('1o2x3o');
    });
  });

  describe('decodeBoard() function', () => {
    it('decodes a properly formed encoded board string as expected', () => {
      expect(decodeBoard('1o2x3o')).toEqual([
        { squareNumber: 1, marked: false },
        { squareNumber: 2, marked: true },
        { squareNumber: 3, marked: false },
      ]);
    });

    it('returns an empty array if none of the string is not properly encoded', () => {
      expect(decodeBoard('foobar')).toEqual([]);
    });

    it('returns an empty array if not all of the string can be decoded', () => {
      expect(decodeBoard('1o2x3')).toEqual([]);
    });
  });
});
