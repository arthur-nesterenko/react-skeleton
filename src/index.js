import React from 'react';
import ReactDOM from 'react-dom';

import styles from './main.scss';

const App = () => <div className={styles.app}>Hello react skeleton</div>;

ReactDOM.render(<App />, document.getElementById('root'));
