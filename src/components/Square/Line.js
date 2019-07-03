import React from 'react';
import Block from './Block';

export default function Line({styleBlock, initialWidth, columnI}) {
    const line = [];
    for (let i = 0; i < initialWidth; i++) {
        line.push(<Block key={i} columnI={columnI} lineI={i} styleBlock={styleBlock} />);
    }

    return(
      <div className="square__line">
        {line}
      </div>
    )
}


