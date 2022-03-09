import React, { SyntheticEvent } from "react";

interface IProps {
  label: string;
  value: any;
  onChange: (x: any) => void;
  id: string;
}

const TextField = (props: IProps) => {
  const onChange = (event: SyntheticEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    props.onChange(value);
  };

  return (
    <div className="text-field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
