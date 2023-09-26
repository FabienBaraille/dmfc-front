import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/App'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Provider } from 'react-redux'

import store from './store';
import  './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router >
    <Provider store={store} >
    <Header />
    <Navbar />
    <App />
    <Footer />
    </Provider>
  </Router>
)
