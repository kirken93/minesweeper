import React from 'react';
import PropTypes from 'prop-types';
import SquareModel from "../models/SquareModel";

const Square = (props) => {
  const handleContextMenu = (event) => {
    if (!props.square.isExposed) {
      event.preventDefault();
      props.flag();
    }
  };

  const { square } = props;

  let content = null;
  let className = "square" + (square.className ? ` ${square.className}` : "");
  if (square.isExposed) {
    className += " exposed";
    if (square.isBomb) {
      content = "💣";
    } else if (!!square.data) {
      content = square.data;
    }
  } else if (square.isFlagged) {
    content = "🚩";
  }

  return <div className={className}
              onClick={props.onClick}
              onContextMenu={handleContextMenu}>
    {content}
  </div>;
};

Square.propTypes = {
  square: PropTypes.instanceOf(SquareModel).isRequired,
  onClick: PropTypes.func,
  flag: PropTypes.func
};

export default Square;