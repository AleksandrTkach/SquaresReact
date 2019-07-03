import React, {useState} from 'react';
import Square from './Square/Square';
import 'scss/App.scss';

const INITIAL_HEIGHT = Number(process.env.REACT_APP_INITIAL_HEIGHT);
const INITIAL_WIDTH = Number(process.env.REACT_APP_INITIAL_WIDTH);
const CELL_SIZE = process.env.REACT_APP_CELL_SIZE;

const styleBlock = {
    height: `${CELL_SIZE}px`,
    width: `${CELL_SIZE}px`,
};

export const App = () => {

    const [squareHeight, setHeight] = useState(INITIAL_HEIGHT);
    const [squareWidth, setWidth] = useState(INITIAL_WIDTH);

    return (
      <>
        <div className="square">
          <Square styleBlock={styleBlock} initialHeight={squareHeight} initialWidth={squareWidth} />
          <div className="block block__orange block_plus-row" style={styleBlock} onClick={() => setHeight(squareHeight + 1)}>
              <i className="fa fa-plus"/></div>
          <div className="block block__orange block_plus-column" style={styleBlock} onClick={() => setWidth(squareWidth + 1)}>
              <i className="fa fa-plus"/></div>
          <div className="block block__red block_minus-column" style={styleBlock}> <i className="fa fa-minus"/> </div>
        </div>
      </>
    );
}

export default App
