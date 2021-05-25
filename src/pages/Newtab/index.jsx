import { render } from 'react-dom';
import App from 'containers/App';

import Newtab from './Newtab';
import './index.css';

render(
  <App>
    <Newtab />
  </App>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
