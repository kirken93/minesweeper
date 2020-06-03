import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import SquareModel from "./SquareModel";

const Square = (props) => {

  const [isClicked, setIsClicked] = useState(false);

  let content = null;
  if (isClicked || props.isGameOver) {
    content = props.square.isBomb
    ? "💣"
    : "🚩";
  }

  const click = () => {
    setIsClicked(true);
    props.onClick();
  };

  return <div className="square"
              onClick={click}>
    {content}
  </div>;
};

Square.propTypes = {
  square: PropTypes.instanceOf(SquareModel).isRequired,
  isGameOver: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Square;