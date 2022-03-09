import React from "react";
import SquareModel from "../models/SquareModel";

interface IProps {
  square: SquareModel;
  onClick: (() => void) | null;
  flag: (() => void) | null;
}

const Square = (props: IProps) => {
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

  return (
    <div
      className={className}
      onClick={props.onClick}
      onContextMenu={handleContextMenu}
    >
      {content}
    </div>
  );
};

export default Square;
