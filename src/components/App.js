import React, {useState} from 'react';
import Square from './Square/Square';
import 'scss/App.scss';

const INITIAL_HEIGHT = Number(process.env.REACT_APP_INITIAL_HEIGHT);
const INITIAL_WIDTH = Number(process.env.REACT_APP_INITIAL_WIDTH);
const CELL_SIZE = process.env.REACT_APP_CELL_SIZE;

const styleBlockSize = {
    height: `${CELL_SIZE}px`,
    width: `${CELL_SIZE}px`,
};

const defaultPositionBtnMinus = {
    'posRow': 0,
    'posCol': 0,
};

export const PositionBtnMinusContent = React.createContext(defaultPositionBtnMinus);

const App = () => {
    const [positionBtnMinus, setPosition] = useState(defaultPositionBtnMinus);
    const [squareHeight, setHeight] = useState(INITIAL_HEIGHT);
    const [squareWidth, setWidth] = useState(INITIAL_WIDTH);

    const styleBlockPositionRow = {
        top: `${positionBtnMinus.posRow}px`,
    };
    const styleBlockPositionColumn = {
        left: `${positionBtnMinus.posCol}px`,
    };

    const _changeSizeSquare = (direction, mathOperation, amountBlocks = 1) => {
        switch(mathOperation) {
            case '+':
                direction === 'height' ? setHeight(squareHeight + amountBlocks) : setWidth(squareWidth + amountBlocks);
                break;
            case '-':
                if (direction === 'height') {
                    if (squareHeight > 1) {
                        setHeight(squareHeight - amountBlocks)
                    }
                } else {
                    if (squareWidth > 1) {
                        setWidth(squareWidth - amountBlocks);
                    }
                }
                break;
            default:
                break;
        }
    };

    let btnsPlus = (
      <>
        <div
          onKeyPress={() => _changeSizeSquare('height', '+')}
          role="button"
          tabIndex="0"
          className="block block__orange block_plus-row"
          style={styleBlockSize}
          onClick={() => _changeSizeSquare('height', '+')}
        >
          <i className="fa fa-plus" />
          row
        </div>
        <div
          onKeyPress={() => _changeSizeSquare('width', '+')}
          role="button"
          tabIndex="0"
          className="block block__orange block_plus-column"
          style={styleBlockSize}
          onClick={() => _changeSizeSquare('width', '+')}
        >
          <i className="fa fa-plus" />
          col
        </div>
      </>
    );

    let btnsMinus = (
      <>
        <div
          onKeyPress={() => _changeSizeSquare('height', '-')}
          role="button"
          tabIndex="0"
          className="block block__red block_minus-row"
          style={{...styleBlockSize, ...styleBlockPositionRow}}
          onClick={() => _changeSizeSquare('height', '-')}
        >
          <i className="fa fa-minus" />
          row
        </div>
        <div
          onKeyPress={() => _changeSizeSquare('width', '-')}
          role="button"
          tabIndex="0"
          className="block block__red block_minus-column"
          style={{...styleBlockSize, ...styleBlockPositionColumn}}
          onClick={() => _changeSizeSquare('width', '-')}
        >
          <i className="fa fa-minus" />
          col
        </div>
      </>
    );

    return (
      <PositionBtnMinusContent.Provider value={{ positionBtnMinus, setPosition }}>
        <div className="square">

          <Square styleBlockSize={styleBlockSize} initialHeight={squareHeight} initialWidth={squareWidth} />

          {btnsPlus}
          {btnsMinus}

        </div>
      </PositionBtnMinusContent.Provider>
    );
};

export default App
