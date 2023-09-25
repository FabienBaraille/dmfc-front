import PropTypes from 'prop-types';

import './Wrapper.scss';

const Wrapper = ({children, name}) => {
  console.log(name)
  return (
    <section className="wrapper" id={name}>
      {children}
    </section>
  )
};

Wrapper.propTypes = {
  children: PropTypes.array,
  name: PropTypes.string,
};

export default Wrapper;