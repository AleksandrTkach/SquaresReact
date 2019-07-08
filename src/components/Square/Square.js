import React, { Component } from 'react';
import Tile from './Tile';
import Btn from './Btn';

const INITIAL_HEIGHT = Number(process.env.REACT_APP_INITIAL_HEIGHT);
const INITIAL_WIDTH = Number(process.env.REACT_APP_INITIAL_WIDTH);
const CELL_SIZE = Number(process.env.REACT_APP_CELL_SIZE);
const PADDING_SIZE = Number(process.env.REACT_APP_PADDING_SIZE);

export default class Square extends Component {
	constructor() {
		super();

		this.state = {
			square: [],
			initialHeight: INITIAL_HEIGHT,
			initialWidth: INITIAL_WIDTH,
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
	 */
	checkPosition = (iRow = this.setState.iRow, iCol = this.setState.iCol) => {
		this.setState({
			...this.state,
			posCol: CELL_SIZE * iCol + PADDING_SIZE * iCol,
			posRow: CELL_SIZE * iRow + PADDING_SIZE * iRow,
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
		const { initialHeight, initialWidth } = this.state;

		for (let row = 0; row < initialHeight; row++) {
			let tiles = [];
			for (let col = 0; col < initialWidth; col++) {
				tiles.push(this._setTile(row, col));
			}
			square[row] = {
				tiles,
			};
		}

		this.setState({
			...this.state,
			square,
		});
	};

	/**
	 * Set params for tile
	 *
	 * @param row
	 * @param col
	 * @returns {*}
	 * @private
	 */
	_setTile = (row, col) => (
		<Tile
			key={`${row}-${col}`}
			cellSize={CELL_SIZE}
			row={row}
			col={col}
			checkPosition={this.checkPosition}
		/>
	);

	/**
	 *
	 * @private
	 */
	_addCol = () => {
		const { initialWidth: col } = this.state;
		let square = [...this.state.square];

		square.map((row, index) => {
			row.tiles.push(this._setTile(index, col));
			return row;
		});

		this.setState({
			...this.state,
			square,
			initialWidth: col + 1,
		});
	};

	/**
	 *
	 * @private
	 */
	_addRow = () => {
		const { initialHeight: row, initialWidth } = this.state;

		let square = [...this.state.square];
		let tiles = [];

		for (let col = 0; col < initialWidth; col++) {
			tiles.push(this._setTile(row, col));
		}

		square[row] = {
			tiles,
		};

		this.setState({
			...this.state,
			square,
			initialHeight: row + 1,
		});
	};

	/**
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	_removeCol = async () => {
		const { iCol, initialWidth } = this.state;
		let square = [...this.state.square];

		square.map(row => row.tiles.filter((tile, index) => index !== iCol));

		await this.setState({
			...this.state,
			square,
			initialWidth: initialWidth - 1,
		});

		this._buildSquare();
	};

	/**
	 *
	 * @returns {Promise<void>}
	 * @private
	 */
	_removeRow = async () => {
		const { square, iRow, initialHeight } = this.state;

		await this.setState({
			...this.state,
			square: square.filter((row, index) => index !== iRow),
			initialHeight: initialHeight - 1,
		});

		this._buildSquare();
	};

	render() {
		const { square, posCol, posRow, initialWidth, initialHeight } = this.state;

		const btnRemoveCol =
			initialWidth > 1 ? (
				<Btn
					cellSize={CELL_SIZE}
					type="minus-row"
					onClick={this._removeCol}
					posCol={posCol}
					posRow={posRow}
					paddingSize={PADDING_SIZE}
				/>
			) : (
				''
			);
		const btnRemoveRow =
			initialHeight > 1 ? (
				<Btn
					cellSize={CELL_SIZE}
					type="minus-col"
					onClick={this._removeRow}
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
					{square.map((row, index) => (
						<div key={`row-${index}`} className="row">
							{row.tiles.map(tile => tile)}
						</div>
					))}

					{btnRemoveCol}
					{btnRemoveRow}
				</div>

				<Btn
					cellSize={CELL_SIZE}
					type="plus-row"
					onClick={this._addRow}
					paddingSize={PADDING_SIZE}
				/>
				<Btn cellSize={CELL_SIZE} type="plus-col" onClick={this._addCol} />
			</div>
		);
	}
}
