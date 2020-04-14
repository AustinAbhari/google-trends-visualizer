import React from 'react';
import styled from 'styled-components';
import Tile from './tile';

const StyledGrid = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 5}, 1fr);
  grid-template-rows: repeat(${props => props.rows || 5}, 1fr);
`;

const getNext = () => {

}


const renderTiles = (row, col) => {
  const tileCount = row * col;
  const tiles = [];

  for(let i = 0; i < tileCount; i++) {
    tiles.push(
      <Tile
        id={`${row}-${col}`} 
        total={row >= col ? row : col}
      />
    )
  }

  return tiles;
}

const Grid = ({ col, row}) => {
  return (
    <StyledGrid columns={col} rows={row}>
      { renderTiles(row, col) }
    </StyledGrid>
  )
}

export default Grid;
