import React from 'react';

export default function InputTextArea(props) {
  const { type, placeholder, className, label, name, value, onChange } = props;

  return (
    <div className={'form-group col-md-6 ' + className}>
      <label for={name}>{label}</label>
      <textarea
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows="4"
      />
    </div>
  );
}
