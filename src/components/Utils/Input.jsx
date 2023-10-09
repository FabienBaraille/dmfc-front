import PropTypes from 'prop-types';

const Input = ({label, htmlFor, type, value, id, className = null, onChange = null, placeholder = null, isRequired = false, inputName = null}) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{label}</label>
      <input 
        name={inputName}
        type={type} 
        id={id} 
        onChange={onChange} 
        defaultValue={value}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  )
};

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  htmlFor: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  inputName: PropTypes.string
};

export default Input;
