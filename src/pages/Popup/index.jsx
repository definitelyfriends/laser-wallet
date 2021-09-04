import { render } from 'react-dom';
import App from 'containers/App';
import './index.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
