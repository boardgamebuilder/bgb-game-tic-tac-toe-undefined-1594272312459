/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Board.css';

const Board = (props) => {

  const { appSettings = {} } = props;
  const { board = {} } = appSettings;
  const { size = 3 } = board;

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log(`Game received message`);
      const { action } = event.data;
      if (action === "reset") {
        props.reset();
      }
    }, false);
  }, [])

  const onClick = id => {
    if (isActive(id)) {
      props.moves.clickCell(id);
    }
  };

  const isActive = (id) => {
    if (!props.isActive) return false;
    if (props.G.cells[id] !== null) return false;
    return true;
  }

  let tbody = [];
  for (let i = 0; i < size; i++) {
    let cells = [];
    for (let j = 0; j < size; j++) {
      const id = size * i + j;
      cells.push(
        <td
          key={id}
          className={isActive(id) ? 'active' : ''}
          onClick={() => onClick(id)}
        >
          {props.G.cells[id]}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  let winner = null;
  if (props.ctx.gameover) {
    winner =
      props.ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {props.ctx.gameover.winner}</div>
      ) : (
          <div id="winner">Draw!</div>
        );
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  );
}

Board.propType = {
  G: PropTypes.any.isRequired,
  ctx: PropTypes.any.isRequired,
  moves: PropTypes.any.isRequired,
  playerID: PropTypes.string,
  isActive: PropTypes.bool,
  isMultiplayer: PropTypes.bool,
}

export default Board;