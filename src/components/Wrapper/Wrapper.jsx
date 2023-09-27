import PropTypes from 'prop-types';

import './Wrapper.scss';

const Wrapper = ({children, name}) => {
  return (
    <section className="wrapper" id={name}>
      {children}
    </section>
  )
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
};

export default Wrapper;