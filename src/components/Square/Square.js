import React from 'react';
import Row from './Row';

export default function Square({styleBlock, initialHeight, initialWidth}) {
    const square = [];
    for (let i = 0; i < initialHeight; i++) {
        square.push(<Row key={i} columnI={i} styleBlock={styleBlock} initialWidth={initialWidth} />);
    }

    return (
      <>
        {square}
      </>
    )
}
