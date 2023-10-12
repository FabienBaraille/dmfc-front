import clipartLogo from '../../assets/design/clipart1224.png';
import 'react-toastify/dist/ReactToastify.css';
import './toastsuccess.scss'

export const toastSucess = {
  position: 'top-center',
  theme: "dark",
  closeOnClick: true,
  pauseOnHover: true,
  autoClose: 2000, 
  progressBar: true,
  icon: <img src={clipartLogo} alt="Success Icon" width="24" height="24" />,
  };

export const toastWarning = {
  position: 'top-center',
  theme: "dark",
  closeOnClick: true,
  pauseOnHover: true,
  autoClose: 2000, 
  progressBar: true,
  icon: <img src={clipartLogo} alt="Success Icon" width="24" height="24" />,
  };