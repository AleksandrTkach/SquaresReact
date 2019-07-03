import React from 'react';
import Line from './Line';

export default function Square({styleBlock, initialHeight, initialWidth}) {
    const square = [];
    for (let i = 0; i < initialHeight; i++) {
        square.push(<Line key={i} columnI={i} styleBlock={styleBlock} initialWidth={initialWidth} />);
    }

    return (
      <>
        {square}
      </>
    )
}
