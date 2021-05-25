import { render } from 'react-dom';
import 'assets/styles/tailwind.css';

import Options from './Options.tsx';
import './index.css';

render(
  <Options title={'settings'} />,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
