import React from 'react';

const cellSize = process.env.REACT_APP_CELL_SIZE;

export default function Block({columnI, lineI, styleBlock}) {

        const _checkPosition = () => {
            console.log(columnI, lineI, styleBlock);
            console.log('posCol: ' + columnI * cellSize)
            console.log('posLine: ' + lineI * cellSize)

        };

        return <div className="block block__blue" style={styleBlock} onMouseOver={_checkPosition} />
}
