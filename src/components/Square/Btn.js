import React from 'react';
import PropTypes from 'prop-types';

export default class Btn extends React.Component {
	render() {
		const { cellSize, type, onClick, posRow, posCol } = this.props;

		const styleSize = {
			height: `${cellSize}px`,
			width: `${cellSize}px`,
		};

		let classNameDiv;
		let classNameIcon;
		let stylePosition;

		switch (type) {
			case 'plus-col':
				classNameDiv = 'tile_orange tile_plus-col';
				classNameIcon = 'plus';
				break;
			case 'plus-row':
				classNameDiv = 'tile_orange tile_plus-row';
				classNameIcon = 'plus';
				break;
			case 'minus-col':
				classNameDiv = 'tile_red tile_minus-col';
				classNameIcon = 'minus';
				stylePosition = {
					top: `${posRow}px`,
				};
				break;
			case 'minus-row':
				classNameDiv = 'tile_red tile_minus-row';
				classNameIcon = 'minus';
				stylePosition = {
					left: `${posCol}px`,
				};
				break;
			default:
				classNameDiv = '';
				classNameIcon = '';
				stylePosition = '';
		}

		return (
			<div
				className={`tile ${classNameDiv}`}
				style={{ ...styleSize, ...stylePosition }}
				onClick={onClick}
			>
				<i className={`fa fa-${classNameIcon}`} />
			</div>
		);
	}
}

Btn.propTypes = {
	cellSize: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	posRow: PropTypes.number,
	posCol: PropTypes.number,
};
