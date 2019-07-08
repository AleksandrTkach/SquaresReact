(window.webpackJsonp = window.webpackJsonp || []).push([
	[0],
	{
		12: function(e, t, a) {
			e.exports = a(20);
		},
		19: function(e, t, a) {},
		20: function(e, t, a) {
			'use strict';
			a.r(t);
			var i = a(0),
				n = a.n(i),
				o = a(11),
				c = a.n(o),
				r = a(7),
				s = a.n(r),
				l = a(9),
				u = a(8),
				p = a(1),
				h = a(2),
				d = a(3),
				m = a(5),
				w = a(4),
				f = a(6),
				b = (function(e) {
					function t() {
						return (
							Object(h.a)(this, t),
							Object(m.a)(this, Object(w.a)(t).apply(this, arguments))
						);
					}
					return (
						Object(f.a)(t, e),
						Object(d.a)(t, [
							{
								key: 'render',
								value: function() {
									var e = this.props,
										t = e.cellSize,
										a = e.checkPosition,
										i = e.row,
										o = e.col,
										c = {
											height: ''.concat(t, 'px'),
											width: ''.concat(t, 'px'),
										};
									return n.a.createElement('div', {
										className: 'tile tile_blue',
										style: c,
										onMouseOver: function() {
											return a(i, o);
										},
									});
								},
							},
						]),
						t
					);
				})(n.a.Component),
				v = (function(e) {
					function t() {
						return (
							Object(h.a)(this, t),
							Object(m.a)(this, Object(w.a)(t).apply(this, arguments))
						);
					}
					return (
						Object(f.a)(t, e),
						Object(d.a)(t, [
							{
								key: 'render',
								value: function() {
									var e,
										t,
										a,
										i = this.props,
										o = i.cellSize,
										c = i.type,
										r = i.onClick,
										s = i.posRow,
										l = i.posCol,
										u = i.paddingSize,
										h = {
											height: ''.concat(o, 'px'),
											width: ''.concat(o, 'px'),
										};
									switch (c) {
										case 'plus-col':
											(e = 'tile_orange tile_plus-col'), (t = 'plus');
											break;
										case 'plus-row':
											(e = 'tile_orange tile_plus-row'),
												(t = 'plus'),
												(a = { marginLeft: ''.concat(u, 'px') });
											break;
										case 'minus-col':
											(e = 'tile_red tile_minus-col'),
												(t = 'minus'),
												(a = { top: ''.concat(s, 'px') });
											break;
										case 'minus-row':
											(e = 'tile_red tile_minus-row'),
												(t = 'minus'),
												(a = { left: ''.concat(l, 'px') });
											break;
										default:
											(e = ''), (t = ''), (a = '');
									}
									return n.a.createElement(
										'div',
										{
											className: 'tile '.concat(e),
											style: Object(p.a)({}, h, a),
											onClick: r,
										},
										n.a.createElement('i', { className: 'fa fa-'.concat(t) })
									);
								},
							},
						]),
						t
					);
				})(n.a.Component),
				O = Number('4'),
				j = Number('4'),
				_ = Number('50'),
				k = Number('2'),
				C = (function(e) {
					function t() {
						var e;
						return (
							Object(h.a)(this, t),
							((e = Object(m.a)(
								this,
								Object(w.a)(t).call(this)
							)).checkPosition = function() {
								var t =
										arguments.length > 0 && void 0 !== arguments[0]
											? arguments[0]
											: e.setState.iRow,
									a =
										arguments.length > 1 && void 0 !== arguments[1]
											? arguments[1]
											: e.setState.iCol;
								e.setState(
									Object(p.a)({}, e.state, {
										posCol: _ * a + k * a,
										posRow: _ * t + k * t,
										iCol: a,
										iRow: t,
									})
								);
							}),
							(e._buildSquare = function() {
								for (
									var t = [],
										a = e.state,
										i = a.initialHeight,
										n = a.initialWidth,
										o = 0;
									o < i;
									o++
								) {
									for (var c = [], r = 0; r < n; r++) c.push(e._setTile(o, r));
									t[o] = { tiles: c };
								}
								e.setState(Object(p.a)({}, e.state, { square: t }));
							}),
							(e._setTile = function(t, a) {
								return n.a.createElement(b, {
									key: ''.concat(t, '-').concat(a),
									cellSize: _,
									row: t,
									col: a,
									checkPosition: e.checkPosition,
								});
							}),
							(e._addCol = function() {
								var t = e.state.initialWidth,
									a = Object(u.a)(e.state.square);
								a.map(function(a, i) {
									return a.tiles.push(e._setTile(i, t)), a;
								}),
									e.setState(
										Object(p.a)({}, e.state, { square: a, initialWidth: t + 1 })
									);
							}),
							(e._addRow = function() {
								for (
									var t = e.state,
										a = t.initialHeight,
										i = t.initialWidth,
										n = Object(u.a)(e.state.square),
										o = [],
										c = 0;
									c < i;
									c++
								)
									o.push(e._setTile(a, c));
								(n[a] = { tiles: o }),
									e.setState(
										Object(p.a)({}, e.state, {
											square: n,
											initialHeight: a + 1,
										})
									);
							}),
							(e._removeCol = Object(l.a)(
								s.a.mark(function t() {
									var a, i, n, o;
									return s.a.wrap(function(t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (
														(a = e.state),
														(i = a.iCol),
														(n = a.initialWidth),
														(o = Object(u.a)(e.state.square)).map(function(e) {
															return e.tiles.filter(function(e, t) {
																return t !== i;
															});
														}),
														(t.next = 5),
														e.setState(
															Object(p.a)({}, e.state, {
																square: o,
																initialWidth: n - 1,
															})
														)
													);
												case 5:
													e._buildSquare();
												case 6:
												case 'end':
													return t.stop();
											}
									}, t);
								})
							)),
							(e._removeRow = Object(l.a)(
								s.a.mark(function t() {
									var a, i, n, o;
									return s.a.wrap(function(t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (
														(a = e.state),
														(i = a.square),
														(n = a.iRow),
														(o = a.initialHeight),
														(t.next = 3),
														e.setState(
															Object(p.a)({}, e.state, {
																square: i.filter(function(e, t) {
																	return t !== n;
																}),
																initialHeight: o - 1,
															})
														)
													);
												case 3:
													e._buildSquare();
												case 4:
												case 'end':
													return t.stop();
											}
									}, t);
								})
							)),
							(e.state = {
								square: [],
								initialHeight: O,
								initialWidth: j,
								posCol: 0,
								posRow: 0,
								iCol: 0,
								iRow: 0,
							}),
							e
						);
					}
					return (
						Object(f.a)(t, e),
						Object(d.a)(t, [
							{
								key: 'componentDidMount',
								value: function() {
									this._buildSquare();
								},
							},
							{
								key: 'render',
								value: function() {
									var e = this.state,
										t = e.square,
										a = e.posCol,
										i = e.posRow,
										o = e.initialWidth,
										c = e.initialHeight,
										r =
											o > 1
												? n.a.createElement(v, {
														cellSize: _,
														type: 'minus-row',
														onClick: this._removeCol,
														posCol: a,
														posRow: i,
														paddingSize: k,
												  })
												: '',
										s =
											c > 1
												? n.a.createElement(v, {
														cellSize: _,
														type: 'minus-col',
														onClick: this._removeRow,
														posCol: a,
														posRow: i,
														paddingSize: k,
												  })
												: '';
									return n.a.createElement(
										'div',
										{ className: 'square' },
										n.a.createElement(
											'div',
											{ className: 'tiles__wrapper' },
											t.map(function(e, t) {
												return n.a.createElement(
													'div',
													{ key: 'row-'.concat(t), className: 'row' },
													e.tiles.map(function(e) {
														return e;
													})
												);
											}),
											r,
											s
										),
										n.a.createElement(v, {
											cellSize: _,
											type: 'plus-row',
											onClick: this._addRow,
											paddingSize: k,
										}),
										n.a.createElement(v, {
											cellSize: _,
											type: 'plus-col',
											onClick: this._addCol,
										})
									);
								},
							},
						]),
						t
					);
				})(i.Component),
				S = function() {
					return n.a.createElement(C, null);
				};
			Boolean(
				'localhost' === window.location.hostname ||
					'[::1]' === window.location.hostname ||
					window.location.hostname.match(
						/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
					)
			);
			a(19);
			c.a.render(n.a.createElement(S, null), document.getElementById('root')),
				'serviceWorker' in navigator &&
					navigator.serviceWorker.ready.then(function(e) {
						e.unregister();
					});
		},
	},
	[[12, 1, 2]],
]);
//# sourceMappingURL=main.26cb2446.chunk.js.map
