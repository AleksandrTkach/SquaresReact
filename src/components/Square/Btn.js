import React from 'react';
import PropTypes from 'prop-types';

export default class Btn extends React.Component {
	_getValues = (type, posBtnMinusRow, posBtnMinusCol, paddingSize) => {
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
				stylePosition = {
					marginLeft: `${paddingSize}px`,
				};
				break;
			case 'minus-row':
				classNameDiv = 'tile_red tile_minus-row';
				classNameIcon = 'minus';
				stylePosition = {
					top: `${posBtnMinusRow}px`,
				};
				break;
			case 'minus-col':
				classNameDiv = 'tile_red tile_minus-col';
				classNameIcon = 'minus';
				stylePosition = {
					left: `${posBtnMinusCol}px`,
				};
				break;
			default:
				classNameDiv = '';
				classNameIcon = '';
				stylePosition = '';
		}

		return {
			classNameDiv,
			classNameIcon,
			stylePosition,
		};
	};

	render() {
		const {
			cellSize,
			type,
			actionOnClick,
			posBtnMinusRow,
			posBtnMinusCol,
			paddingSize,
		} = this.props;

		const styleSize = {
			height: `${cellSize}px`,
			width: `${cellSize}px`,
		};

		const { classNameDiv, stylePosition, classNameIcon } = this._getValues(
			type,
			posBtnMinusRow,
			posBtnMinusCol,
			paddingSize
		);

		return (
			<div
				id={`btn-${type}`}
				className={`tile ${classNameDiv}`}
				style={{ ...styleSize, ...stylePosition }}
				onClick={actionOnClick}
			>
				<i className={`fa fa-${classNameIcon}`} />
			</div>
		);
	}
}

Btn.propTypes = {
	cellSize: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	actionOnClick: PropTypes.func.isRequired,
	paddingSize: PropTypes.number,
	posBtnMinusRow: PropTypes.number,
	posBtnMinusCol: PropTypes.number,
};
