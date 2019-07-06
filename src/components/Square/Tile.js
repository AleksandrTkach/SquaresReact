import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
	render() {
		const { cellSize, checkPosition, row, col } = this.props;

		const style = {
			height: `${cellSize}px`,
			width: `${cellSize}px`,
		};

		return (
			<div
				className="tile tile_blue"
				style={style}
				onMouseOver={() => checkPosition(row, col)}
			/>
		);
	}
}

Tile.propTypes = {
	cellSize: PropTypes.number.isRequired,
	row: PropTypes.number.isRequired,
	col: PropTypes.number.isRequired,
};
