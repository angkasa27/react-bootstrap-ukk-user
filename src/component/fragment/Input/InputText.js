import React from 'react';

export default function InputText({
  className,
  name,
  label,
  placeholder,
  type,
  value,
  onChange,
}) {
  return (
    <div className={'form-group col-md-6 ' + className}>
      <label for={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

InputText.defaultProps = {
  className: '',
  name: '',
  label: '',
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {},
};
