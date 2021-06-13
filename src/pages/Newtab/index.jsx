import { render } from 'react-dom';
import App from 'containers/App';
import './index.css';

render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
