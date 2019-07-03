import React from 'react';

const cellSize = process.env.REACT_APP_CELL_SIZE;
const styleBlock = {
    height: `${cellSize}px`,
    width: `${cellSize}px`,
};


export default function Block(props) {

        const _checkPosition = () => {
            console.log(props);
        };

        return <div className="block block__default" style={styleBlock} onMouseOver={_checkPosition} />

}
