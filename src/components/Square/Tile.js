import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
	render() {
		const { cellSize, checkPosition, iRow, iCol } = this.props;

		const style = {
			height: `${cellSize}px`,
			width: `${cellSize}px`,
		};

		return (
			<div
				className="tile tile_blue"
				style={style}
				onMouseOver={() => checkPosition(iRow, iCol)}
			/>
		);
	}
}

Tile.propTypes = {
	cellSize: PropTypes.number.isRequired,
	iRow: PropTypes.number.isRequired,
	iCol: PropTypes.number.isRequired,
};
