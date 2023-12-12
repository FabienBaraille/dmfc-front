import clipartLogo from '../../assets/design/clipart1224.png';

import 'react-toastify/dist/ReactToastify.css';
import './toastDMFC.scss';

export const toastSuccess = {
  position: 'top-center',
  theme: "dark",
  closeOnClick: true,
  pauseOnHover: true,
  autoClose: 2000, 
  progressBar: true,
  icon: <img src={clipartLogo} alt="Ball Icon" width="24" height="24" />,
};

export const toastInfo = {
  position: 'top-center',
  theme: "dark",
  closeOnClick: true,
  pauseOnHover: true,
  autoClose: 2000, 
  progressBar: true,
  icon: <img src={clipartLogo} alt="Ball Icon" width="24" height="24" />,
};

export const toastWarning = {
  position: 'top-center',
  theme: "dark",
  closeOnClick: true,
  pauseOnHover: true,
  autoClose: 3000, 
  progressBar: true,
  icon: <img src={clipartLogo} alt="Ball Icon" width="24" height="24" />,
};