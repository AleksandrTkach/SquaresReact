import React from 'react';
import Block from './Block';

export default function Row({styleBlock, initialWidth, columnI}) {
    const row = [];
    for (let i = 0; i < initialWidth; i++) {
        row.push(<Block key={i} columnI={columnI} lineI={i} styleBlock={styleBlock} />);
    }

    return(
      <div className="square__line">
        {row}
      </div>
    )
}


