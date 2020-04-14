import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors2, animals } from './data';
import { randomNumber, aDiffRandom } from './helpers';

/*
  to-do
  - add fade in - maybe scroll in on new div
  - color grid
  - grid updater
  -
*/

const StyledTyping = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${props => props.background};
  word-break: break-all;
  font-size: calc(20vmin/${props => props.total || 1});
  word-wrap: break-word;
  text-shadow: 0px 1px #000000;
  color: white;
  padding: 0 0.3em;
  p {
    margin: 0;
    font-weight: 500;
  }
  span {
    font-weight: 100;
  }
`;


const AnimationWidth = keyframes`
  from {width: 0}
  to {width: 100%}
`;

const AnimationHeight = keyframes`
  from {height: 0}
  to {height: 100%}
`;


const StyledTile = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledTranistion = styled.div`
  z-index: 2;
  position: absolute;
  overflow: hidden;
  background: ${props => props.background};
`;

const StyledRightToLeft = styled(StyledTranistion)`
  width: 0;
  height: 100%;
  animation: ${AnimationWidth} 510ms ease-in infinite;
  right: 0;
`;

const StyledLeftToRight = styled(StyledTranistion)`
  width: 0;
  height: 100%;
  animation: ${AnimationWidth} 510ms ease-in infinite;
`;

const StyledTopToBottom = styled(StyledTranistion)`
  width: 100%;
  height: 0;
  animation: ${AnimationHeight} 510ms ease-in infinite;
`;

const StyledBottomToTop = styled(StyledTranistion)`
  width: 100%;
  height: 0;
  animation: ${AnimationHeight} 510ms ease-in infinite;
  bottom: 0;
`;


const Animations = [
  StyledRightToLeft,
  StyledLeftToRight,
  StyledTopToBottom,
  StyledBottomToTop
]

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColorIndex: randomNumber(colors2.length),
      nextColorIndex: null,
      transitionStyle: null,
      word: animals[randomNumber(animals.length)],
      typedIndex: 0,
      pipe: '|',
      wait: false
    }

    this.state.nextColorIndex = aDiffRandom(colors2.length -1, this.state.currentColorIndex);
    this.setTypingInterval();
  }

  setTypingInterval = () => {
    clearInterval(this.wordInterval)
    let rando = randomNumber(400, 100);
    this.wordInterval = setInterval(() => {
      this.typing();
      this.setTypingInterval()
    }, rando)
  }

  justChillForAsecThenTransition = async () => {
    this.setState({ wait: true});
    this.pipeInterval = setInterval(() => this.setState({ pipe: this.state.pipe === '|' ? ' ' : '|' }), 300);
    await new Promise(resolve =>
      setTimeout(() => this.setState({ transitionStyle:  Animations[randomNumber(Animations.length)]}, this.setAfterTansition), randomNumber(2000, 1000))
    )
  }

  typing = () => {
    const { typedIndex, word,  wait } = this.state;

    if (!wait) {
      typedIndex === word.length
        ? this.justChillForAsecThenTransition()
        : this.setState({ typedIndex : this.state.typedIndex + 1})
    }
  }

  setAfterTansition = () => {
    clearInterval(this.pipeInterval);
    const nextIndex = this.state.nextColorIndex;
    setTimeout(() =>
      this.setState({
        transitionStyle: null,
        typedIndex: 0,
        currentColorIndex: nextIndex,
        word: animals[randomNumber(animals.length)],
        nextColorIndex: aDiffRandom(colors2.length -1, nextIndex),
        wait: false,
        pipe: '|'
      })
    , 500)
  }

  render() {
    const { currentColorIndex, nextColorIndex, transitionStyle, word, typedIndex, pipe } = this.state;
    const StyleComponent = transitionStyle;
    return (
      <StyledTile>
      { transitionStyle && <StyleComponent background={colors2[nextColorIndex]}/> }
      <StyledTyping total={this.props.total} background={colors2[currentColorIndex]}>
        <p> {word && word.substring(0, typedIndex)}
          <span>{pipe}</span>
        </p>
      </StyledTyping>
      </StyledTile>
    );
  }
}

export default Tile;
