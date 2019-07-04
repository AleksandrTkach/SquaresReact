import React, {useContext} from 'react';
import {PositionBtnMinusContent} from 'components/App';
import {PaddingSize} from 'scss/variables/Variables.js';

const cellSize = process.env.REACT_APP_CELL_SIZE;

const Block = ({iRow, iCol, styleBlockSize}) => {
    const {setPosition} = useContext(PositionBtnMinusContent);

    const _checkPosition = () => {
        setPosition({
            'posRow': iRow * cellSize + PaddingSize * iRow,
            'posCol': iCol * cellSize + PaddingSize * iCol
        });

    };

    return (
      <div
        className="block block__blue"
        style={styleBlockSize}
        onMouseOver={_checkPosition}
        onFocus={_checkPosition}
      />
    )
};

export default Block

