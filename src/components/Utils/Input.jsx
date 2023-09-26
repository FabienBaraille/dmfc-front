import PropTypes from 'prop-types';

const Input = ({label, htmlFor, type, value, id = null, onChange = null, placeholder = null}) => {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <input 
        type={type} 
        id={id} 
        onChange={onChange} 
        value={value}
        placeholder={placeholder}
      />
    </>
  )
};

Input.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Input;
