import { useRef } from 'react';

import './UpButton.scss';

const UpButton = () => {
  const BtnRef = useRef(null);

  window.onscroll = function toggle() {
    if (document.documentElement.scrollTop > 10) {
      BtnRef.current.style.display = 'block';
    } else {
      BtnRef.current.style.display = 'none';
    }
  };

  const toTheTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button
      ref={BtnRef}
      type="button"
      className="to-the-top"
      onClick={toTheTop}
    >
      <div className='up-logo'></div>
    </button>
  );
};

export default UpButton;
