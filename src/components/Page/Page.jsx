import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import './Page.scss';

const Page = ({ children }) => {
  const pageRef = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [children]);
  return (
  <div className="page" ref={pageRef}>
    {children}
  </div>
)};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
