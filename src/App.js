import React, { useState } from 'react';
import Grid from './grid';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: absolute;
  top: ${props => props.top || 0};
  left: ${props => props.left || '10px'};
  z-index: 4;
`

const StyledApp = styled.div`
`;

const App = () => {
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);
  return (
    <StyledApp>
      <StyledButton onClick={() => setRow(row + 1)}> Row + </StyledButton>
      <StyledButton onClick={() => setRow(row -1 )} top='30px'> Row - </StyledButton>
      <StyledButton onClick={() => setCol(col + 1)} left='50px'> col +</StyledButton>
      <StyledButton onClick={() => setCol(col - 1)} left='50px' top='30px'> col -</StyledButton>
      <Grid col={col} row={row} />
    </StyledApp>
  );
}

export default App;
