import React from 'react';
import PropTypes from 'prop-types';

export default class Tile extends React.Component {
	render() {
		const { cellSize, checkPosition, indexRow, indexCol } = this.props;

		const style = {
			height: `${cellSize}px`,
			width: `${cellSize}px`,
		};

		return (
			<div
				className="tile tile_blue"
				style={style}
				onMouseOver={() => checkPosition(indexRow, indexCol)}
			/>
		);
	}
}

Tile.propTypes = {
	cellSize: PropTypes.number.isRequired,
	indexRow: PropTypes.number.isRequired,
	indexCol: PropTypes.number.isRequired,
};
