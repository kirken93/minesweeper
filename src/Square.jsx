import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import SquareModel from "./SquareModel";

const Square = (props) => {

  const [isClicked, setIsClicked] = useState(false);

  const content = props.square.isBomb
    ? "💣"
    : "?";

  return <div className="square">
    {content}
  </div>;
};

Square.propTypes = {
  square: PropTypes.instanceOf(SquareModel).isRequired
};

export default Square;