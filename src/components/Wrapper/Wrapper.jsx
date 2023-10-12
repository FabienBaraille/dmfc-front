import PropTypes from 'prop-types';

import './Wrapper.scss';
import { useEffect } from 'react';

const Wrapper = ({children, name}) => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [children])
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