import { useState } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({label, type, value, id, className = null, onChange = null, placeholder = null, isRequired = false, inputName = null, onFocus= null, onBlur= null }) => {
  const [hide, setHide] = useState(true);
  
  return (
    <div className={`input-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input 
        name={inputName}
        type={id !== 'password' ? type : hide ? type : 'text'}
        id={id} 
        onChange={onChange} 
        defaultValue={value}
        placeholder={placeholder}
        required={isRequired}
        onFocus={onFocus}
        onBlur={onBlur}
        min="0"
      />
      {id === 'password' && 
        <span onClick={() => setHide(!hide)}>
          <div className={hide ? 'eye-open' : 'eye-close'}></div>
        </span>
      }
    </div>
  )
};

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  inputName: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
