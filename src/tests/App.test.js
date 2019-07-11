import React from 'react';
import { shallow, mount } from 'enzyme';

import App from 'components/App';
import Square from 'components/Square/Square';
import Tile from 'components/Square/Tile';

const currentHeight = () => SquareMount.find('.row').length;
const currentWidth = () => SquareMount.find('.row').at(0).find(Tile).length;

const AppShallow = shallow(<App />);
const SquareShallow = shallow(<Square />);
const SquareMount = mount(<Square />);
const TileShallow = shallow(<Tile indexCol={1} indexRow={1} cellSize={50}/>);

describe('Render', () => {
	it('App', () => expect(AppShallow).toMatchSnapshot());
	it('Square', () => expect(SquareShallow).toMatchSnapshot());
	it('Tile', () => expect(TileShallow).toMatchSnapshot());
});

describe('Square', () => {

	it('initialHeight', () => {
		const {initialHeight} = AppShallow.props();
		expect(SquareShallow.find('.row')).toHaveLength(initialHeight);
	});

	it('initialWidth', () => {
		const {initialWidth} = AppShallow.props();
		expect(SquareShallow.find('.row').at(0).find(Tile)).toHaveLength(initialWidth);
	});

	it('plusRow', () => {
		const squareHeight = currentHeight();
		SquareMount.find('#btn-plus-row').simulate('click');
		expect(SquareMount.find('.row')).toHaveLength(squareHeight + 1);
	});

	it('plusCol', () => {
		const squareWidth = currentWidth();
		SquareMount.find('#btn-plus-col').simulate('click');
		expect(SquareMount.find('.row').at(0).find(Tile)).toHaveLength(squareWidth + 1);
	});

	it('minusRow', () => {
		const squareHeight = currentHeight();
		SquareMount.find('#btn-minus-row').simulate('click');
		expect(SquareMount.find('.row')).toHaveLength(squareHeight - 1);
	});

	it('minusCol', () => {
		const squareWidth = currentWidth();
		SquareMount.find('#btn-minus-col').simulate('click');
		expect(SquareMount.find('.row').at(0).find(Tile)).toHaveLength(squareWidth - 1);
	});

	it('lastRowNotRemoved', () => {
		const SquareMount = mount(<Square initialHeight={1} initialWidth={1} cellSize={1}/>);
		SquareMount.find('#btn-minus-row').simulate('click');
		expect(SquareMount.find('.row')).toHaveLength(1);
	});

	it('lastColNotRemoved', () => {
		const SquareMount = mount(<Square initialHeight={1} initialWidth={1} cellSize={1}/>);
		SquareMount.find('#btn-minus-col').simulate('click');
		expect(SquareMount.find('.row').at(0).find(Tile)).toHaveLength(1);
	});
});
