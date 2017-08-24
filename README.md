<p align="center">
    <img src="https://raw.githubusercontent.com/marcolanaro/react-web-share-api/master/logo.png" width=300>
</p>
<p align="center">
  <strong>
    <a href="https://facebook.github.io/react/">React</a> high order component to drive <a href="https://github.com/WICG/web-share">web share</a> widget on react applications 📌.
  </strong>
</p>


## Browser support

[Web Sahre api](https://developers.google.com/web/updates/2016/10/navigator-share) is supported on Chrome for Android and Android Webview v. ^55.0.

## Demo

You can find a working demo [here](https://lanaro.net/react-web-share-api/). Be sure to use a supported browser.

## NPM Install

```bash
npm install react-web-share-api --save
```

## Usage

Consume the UI component in the hight order component `button.js`:

```js
import React from "react";
import webShare from 'react-web-share-api';

const Button = ({ share, isSupported }) => isSupported
    ? <button onClick={share}>Share now!</button>
    : <span>Web Share not supported</span>;

export default webShare<OwnProps>()(Button);
```

Pass the configuration to the high order component `smartComponent.js`:

```js
import React from "react";

import Button from "./button";

const SmartComponent = (config) =>
  <Button config={config} foo="bar" />;

export default SmartComponent;
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
