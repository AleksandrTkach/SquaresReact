import React, { Component } from 'react';
import Tile from './Tile';
import Btn from './Btn';

const PADDING_SIZE = Number(process.env.REACT_APP_PADDING_SIZE);

export default class Square extends Component {
	constructor(props) {
		super(props);

		this.state = {
			square: [],
			posBtnMinusCol: 0,
			posBtnMinusRow: 0,
			indexCol: 0,
			indexRow: 0,
			uniqueKey: 0,
			isShowBtnMinusCol: true,
			isShowBtnMinusRow: true,
		};
	}

	componentDidMount() {
		this._buildSquare();
	}

	/**
	 * Check position btns minus
	 *
	 * @param indexRow
	 * @param indexCol
	 * @param cellSize
	 */
	checkPosition = (
		indexRow = this.state.indexRow,
		indexCol = this.state.indexCol,
		cellSize = this.props.cellSize
	) => {
		const squareHeight = this.state.square.length - 1;
		if (squareHeight < indexRow) {
			indexRow = squareHeight;
		}

		const squareWidth = this.state.square[0].tiles.length - 1;
		if (squareWidth < indexCol) {
			indexCol = squareWidth;
		}

		this.setState({
			posBtnMinusCol: cellSize * indexCol + PADDING_SIZE * indexCol,
			posBtnMinusRow: cellSize * indexRow + PADDING_SIZE * indexRow,
			indexCol,
			indexRow,
			isShowBtnMinusCol: squareWidth > 0,
			isShowBtnMinusRow: squareHeight > 0,
		});
	};

	/**
	 * Build square
	 *
	 * @private
	 */
	_buildSquare = () => {
		let square = [];
		let uniqueKey = 0;

		for (let row = 0; row < this.props.initialHeight; row++) {
			let tiles = [];

			for (let col = 0; col < this.props.initialWidth; col++) {
				tiles[col] = {
					id: uniqueKey++,
				};
			}
			square[row] = {
				id: uniqueKey++,
				tiles: tiles,
			};
		}

		this.setState({
			square,
			uniqueKey,
		});
	};

	/**
	 *
	 * @private
	 */
	_addCol = () => {
		let { uniqueKey } = this.state;
		let square = [...this.state.square];

		square.map(row => row.tiles.push({ id: uniqueKey++ }));

		this.setState({
			square,
			uniqueKey,
		});
	};

	/**
	 *
	 * @private
	 */
	_addRow = () => {
		let square = [...this.state.square];
		let { uniqueKey } = this.state;
		const squareWidth = square[0].tiles.length;

		let tiles = [];
		for (let col = 0; col < squareWidth; col++) {
			tiles.push({ id: uniqueKey++ });
		}

		square.push({
			id: uniqueKey++,
			tiles: tiles,
		});

		this.setState({
			square,
			uniqueKey,
		});
	};

	/**
	 *
	 * @private
	 */
	_removeCol = async () => {
		const square = [...this.state.square];
		const { indexCol } = this.state;
		const cols = square[0].tiles.length;

		if (cols > 1) {
			square.map(row => row.tiles.splice(indexCol, 1));

			await this.setState({
				square,
			});

			this.checkPosition();
		}
	};

	/**
	 *
	 * @private
	 */
	_removeRow = async () => {
		const square = [...this.state.square];
		const { indexRow } = this.state;
		const rows = square.length;

		if (rows > 1) {
			square.splice(indexRow, 1);

			await this.setState({
				square,
			});

			this.checkPosition();
		}
	};

	render() {
		const {
			square,
			posBtnMinusCol,
			posBtnMinusRow,
			isShowBtnMinusCol,
			isShowBtnMinusRow,
		} = this.state;

		const { cellSize } = this.props;

		const styleSquare = {
			margin: `${cellSize + PADDING_SIZE}px`,
		};

		return (
			<div className="square" style={styleSquare}>
				<div className="tiles__wrapper">
					{square.map((row, indexRow) => (
						<div key={`row-${row.id}`} className="row">
							{row.tiles.map((tile, indexCol) => (
								<Tile
									key={`tile-${tile.id}`}
									cellSize={cellSize}
									indexRow={indexRow}
									indexCol={indexCol}
									checkPosition={this.checkPosition}
								/>
							))}
						</div>
					))}

					{isShowBtnMinusRow && (
						<Btn
							cellSize={cellSize}
							type="minus-row"
							actionOnClick={this._removeRow}
							posBtnMinusCol={posBtnMinusCol}
							posBtnMinusRow={posBtnMinusRow}
							paddingSize={PADDING_SIZE}
						/>
					)}

					{isShowBtnMinusCol && (
						<Btn
							cellSize={cellSize}
							type="minus-col"
							actionOnClick={this._removeCol}
							posBtnMinusCol={posBtnMinusCol}
							posBtnMinusRow={posBtnMinusRow}
							paddingSize={PADDING_SIZE}
						/>
					)}
				</div>

				<Btn
					cellSize={cellSize}
					type="plus-row"
					actionOnClick={this._addRow}
					paddingSize={PADDING_SIZE}
				/>
				<Btn cellSize={cellSize} type="plus-col" actionOnClick={this._addCol} />
			</div>
		);
	}
}

Square.defaultProps = {
	cellSize: 50,
	initialHeight: 4,
	initialWidth: 4,
};
