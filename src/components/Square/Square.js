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

	checkPosition = (iRow = this.setState.iRow, iCol = this.setState.iCol) => {
		this.setState({
			...this.state,
			posCol: CELL_SIZE * iCol + PADDING_SIZE * iCol,
			posRow: CELL_SIZE * iRow + PADDING_SIZE * iRow,
			iCol,
			iRow,
		});
	};

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

	_setTile = (row, col) => (
		<Tile
			key={`${row}-${col}`}
			cellSize={CELL_SIZE}
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
			...this.state,
			square,
			initialWidth: col + 1,
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
			...this.state,
			square,
			initialHeight: row + 1,
		});
	};

	_removeCol = () => {
		const promise = new Promise((resolve, reject) => {
			try {
				const { iCol, initialWidth } = this.state;
				let square = [...this.state.square];

				square.map(row => row.tiles.filter((tile, index) => index !== iCol));

				this.setState({
					...this.state,
					square,
					initialWidth: initialWidth - 1,
				});
				return resolve(true);
			} catch (e) {
				return reject(new Error('removeCol'));
			}
		});

		// promise.then(() => this._buildSquare(), (e) => console.log('error:', e));
		this._rebuildSquare(promise);
	};

	_removeRow = () => {
		const promise = new Promise((resolve, reject) => {
			try {
				const { square, iRow, initialHeight } = this.state;

				this.setState({
					...this.state,
					square: square.filter((row, index) => index !== iRow),
					initialHeight: initialHeight - 1,
				});
				return resolve(true);
			} catch (e) {
				return reject(new Error('removeRow'));
			}
		});

		// promise.then(() => this._buildSquare(), (e) => console.log('error:', e));
		this._rebuildSquare(promise);
	};

	_rebuildSquare = async promise => {
		try {
			await promise;
			this._buildSquare();
		} catch (e) {
			console.log('error:', e);
		}
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
