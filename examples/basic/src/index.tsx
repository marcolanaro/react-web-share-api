import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Button from './button';
import styles from './styles';

const App = () => (
  <div style={styles.container}>
    <div style={styles.logo} />
    <h1 style={styles.h1}>React Web Share API</h1>
    <h2 style={styles.h2}>
      High order component to drive &nbsp;
      <a href="https://github.com/WICG/web-share" target="_blank" style={styles.a}>Web Share</a>
      &nbsp; widget on react applications 📌
    </h2>
    <div style={styles.content}>
      <Button
        config={{
          params: {
            title: 'My share',
            text: 'Check out this amazing react-share-api library',
            url: 'https://github.com/marcolanaro/react-web-share-api',
          },
          /* tslint:disable-next-line:no-console */
          onShareSuccess: () => console.log('Success'),
          /* tslint:disable-next-line:no-console */
          onShareError: (error: Error) => console.log('error', error),
        }}
        style={styles.button}
      />
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
