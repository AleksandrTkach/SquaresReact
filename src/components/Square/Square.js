import React from 'react';
import Row from './Row';

const Square = ({styleBlockSize, initialHeight, initialWidth}) => {
    const square = [];
    for (let i = 0; i < initialHeight; i++) {
        square.push(<Row key={i} iRow={i} styleBlockSize={styleBlockSize} initialWidth={initialWidth} />);
    }

    return (
      <>
        {square}
      </>
    )
};

export default Square
