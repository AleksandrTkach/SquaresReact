import React from 'react';
import Block from './Block';

export default function Row({styleBlockSize, initialWidth, iRow}) {
    const row = [];
    for (let i = 0; i < initialWidth; i++) {
        row.push(<Block key={i} iRow={iRow} iCol={i} styleBlockSize={styleBlockSize} />);
    }

    return(
      <div className="square__line">
        {row}
      </div>
    )
}


