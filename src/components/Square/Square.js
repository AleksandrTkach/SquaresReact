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
			initialHeight: initialHeight,
			initialWidth: initialWidth,
			cellSize,
			posCol: 0,
			posRow: 0,
			iCol: 0,
			iRow: 0,
			counter: 0,
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
		const { initialHeight, initialWidth } = this.state;

		let square = [];
		let counter = 0;

		for (let row = 0; row < initialHeight; row++) {
			let tiles = [];

			for (let col = 0; col < initialWidth; col++) {
				tiles[col] = {
					id: counter++,
				};
			}
			square[row] = {
				id: counter++,
				tiles: tiles,
			};
		}
		console.log('square: ', square);
		this.setState({
			square,
		});
	};

	_setTile = (row, col, cellSize = this.state.cellSize) => (
		<Tile
			key={`${row}-${col}`}
			cellSize={cellSize}
			row={row}
			col={col}
			checkPosition={this.checkPosition}
		/>
	);

	_addCol = () => {
		const { initialWidth: col } = this.state;
		let square = [...this.state.square];

		square.map((row, index) => {
			row.tiles.push(this._setTile(index, col));
			return row;
		});

		this.setState({
			square,
		});
	};

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
			square,
		});
	};

	_removeCol = async () => {
		const { iCol } = this.state;
		let square = [...this.state.square];

		square.map(row => row.tiles.filter((tile, index) => index !== iCol));

		await this.setState({
			square,
		});

		this._buildSquare();
	};

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
			initialWidth,
			initialHeight,
			cellSize,
		} = this.state;

		const btnRemoveCol =
			initialWidth > 1 ? (
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
			initialHeight > 1 ? (
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
						<div key={`row-${row.id}`} className="row">
							{row.tiles.map((tile, iCol) => (
								<Tile
									key={`${tile.id}`}
									cellSize={cellSize}
									iRow={iRow}
									iCol={iCol}
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
