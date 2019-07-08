import React, { Component } from 'react';
import Tile from './Tile';
import Btn from './Btn';

const PADDING_SIZE = Number(process.env.REACT_APP_PADDING_SIZE);

export default class Square extends Component {
	constructor(props) {
		super(props);

		const { initialHeight, initialWidth, cellSize } = this.props;

		this.state = {
			square: [],
			squareHeight: initialHeight,
			squareWidth: initialWidth,
			cellSize,
			posCol: 0,
			posRow: 0,
			iCol: 0,
			iRow: 0,
		};
	}

	componentDidMount() {
		this._buildSquare();
	}

	/**
	 * Check position btns minus
	 *
	 * @param iRow
	 * @param iCol
	 * @param cellSize
	 */
	checkPosition = (
		iRow = this.state.iRow,
		iCol = this.state.iCol,
		cellSize = this.state.cellSize
	) => {
		console.log(iRow, ' : ', iCol);
		this.setState({
			posCol: cellSize * iCol + PADDING_SIZE * iCol,
			posRow: cellSize * iRow + PADDING_SIZE * iRow,
			iCol,
			iRow,
		});
	};

	/**
	 * Build square
	 *
	 * @private
	 */
	_buildSquare = () => {
		let square = [];
		const { squareHeight, squareWidth } = this.state;

		for (let row = 0; row < squareHeight; row++) {
			let tiles = [];
			for (let col = 0; col < squareWidth; col++) {
				tiles.push(col);
			}
			square[row] = tiles;
		}

		this.setState({
			square,
		});
	};

	// /**
	//  * Set params for tile
	//  *
	//  * @param row
	//  * @param col
	//  * @param cellSize
	//  * @returns {*}
	//  * @private
	//  */
	// _setTile = (row, col, cellSize = this.state.cellSize) => (
	// 	<Tile
	// 		key={`${row}-${col}`}
	// 		cellSize={cellSize}
	// 		row={row}
	// 		col={col}
	// 		checkPosition={this.checkPosition}
	// 	/>
	// );

	/**
	 *
	 * @private
	 */
	_addCol = () => {
		const iTile = this.state.square[0].length;

		let square = [...this.state.square];
		square.map(row => row.push(iTile));

		this.setState({
			square,
		});
	};

	/**
	 *
	 * @private
	 */
	_addRow = () => {
		const iRow = this.state.square.length;
		const squareWidth = this.state.square[0].length;

		let square = [...this.state.square];
		let row = [];

		for (let iCol = 0; iCol < squareWidth; iCol++) {
			row.push(iCol);
		}
		square[iRow] = row;

		this.setState({
			square,
		});
	};

	/**
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	_removeCol = async () => {
		const { iCol } = this.state;
		let square = [...this.state.square];

		square.map(row => row.tiles.filter((tile, index) => index !== iCol));

		await this.setState({
			square,
		});

		this._buildSquare();
	};

	/**
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	_removeRow = async () => {
		const { square, iRow } = this.state;

		await this.setState({
			square: square.filter((row, index) => index !== iRow),
		});

		this._buildSquare();
	};

	render() {
		const {
			square,
			posCol,
			posRow,
			squareWidth,
			squareHeight,
			cellSize,
		} = this.state;

		const btnRemoveCol =
			squareWidth > 1 ? (
				<Btn
					cellSize={cellSize}
					type="minus-row"
					onClick={this._removeRow}
					posCol={posCol}
					posRow={posRow}
					paddingSize={PADDING_SIZE}
				/>
			) : (
				''
			);
		const btnRemoveRow =
			squareHeight > 1 ? (
				<Btn
					cellSize={cellSize}
					type="minus-col"
					onClick={this._removeCol}
					posCol={posCol}
					posRow={posRow}
					paddingSize={PADDING_SIZE}
				/>
			) : (
				''
			);

		return (
			<div className="square">
				<div className="tiles__wrapper">
					{square.map((row, iRow) => (
						<div key={`row-${iRow}`} className="row">
							{row.map((tile, iCol) => (
								<Tile
									key={`${iRow}-${iCol}`}
									cellSize={cellSize}
									row={iRow}
									col={iCol}
									checkPosition={this.checkPosition}
								/>
							))}
						</div>
					))}

					{btnRemoveCol}
					{btnRemoveRow}
				</div>

				<Btn
					cellSize={cellSize}
					type="plus-row"
					onClick={this._addRow}
					paddingSize={PADDING_SIZE}
				/>
				<Btn cellSize={cellSize} type="plus-col" onClick={this._addCol} />
			</div>
		);
	}
}
