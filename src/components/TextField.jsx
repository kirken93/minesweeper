import React from "react"
import PropTypes from "prop-types"

const TextField = (props) => {
  const onChange = (event) => {
    props.onChange(event.target.value);
  };

  return <div className="text-field">
    <label htmlFor={props.id}>{props.label}</label>
    <input type="text"
           id={props.id}
           value={props.value} 
           onChange={onChange} />
  </div>;
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default TextField