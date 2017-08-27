<p align="center">
    <img src="https://raw.githubusercontent.com/marcolanaro/react-web-share-api/master/logo.png" width=300>
</p>
<p align="center">
  <strong>
    <a href="https://facebook.github.io/react/">React</a> high order component to drive <a href="https://github.com/WICG/web-share">web share</a> widget on react applications 📌.
  </strong>
  <br><br>
  <a href="https://npmjs.com/package/react-web-share-api">
    <img src="https://img.shields.io/npm/v/react-web-share-api.svg">
  </a>
  <a href="https://github.com/marcolanaro/react-web-share-api/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/marcolanaro/react-web-share-api.svg">
  </a>
  <img src="https://img.shields.io/travis/marcolanaro/react-web-share-api.svg">
  <img src="http://img.badgesize.io/https://unpkg.com/react-web-share-api/dist/react-web-share-api.min.js?compression=gzip&label=gzip%20size">
  <img src="http://img.badgesize.io/https://unpkg.com/react-web-share-api/dist/react-web-share-api.min.js?label=size">
  <a href="https://npmjs.com/package/react-web-share-api">
    <img src="https://img.shields.io/npm/dm/react-web-share-api.svg">
  </a>
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

## FAQ

#### How does it work?

It takes a configuration prop that define how the native widget should behave and any other property you want to pass to the UI component. It spread all the properties a part from the configuration to the enhanced UI component. The UI component will also receive other props that will help improving the experience allowing complete control on the renderer and on the action handler.

#### Does it support Redux or any other flux implementation?

Yes, the configuration is injected from the parent component. In this way it does not matter which flux implementation you are using. At the same time, we are preserving the high order component pattern so you have complete control on the renderer and on the action handler.

#### Does it support Typescript?

Yes, you don't need to install any typescript dependecies because types come with the library. It export `WebShareConfigContainer` (injected configuration) and `WebShareInterface` (UI component extended props) typescript interfaces. All the [examples](https://github.com/marcolanaro/react-web-share-api/tree/master/examples) are written in typescript.

## API

Your wrapped component will be decorated with this injected props:

Parameter   | Type                           | Description
----------- | ------------------------ | -----------
isSupported | boolean                  | True if the web share api is supported by the browser.
share       | function: () => WebShare | It will open the share native widget.

Configuration of the high order component:

Parameter      | Type                            | Description
-------------- | ------------------------------- | -----------
params         | object                          | Required. At the moment it consist in the following props: `{ title, text, url }`
onShareSuccess | Promise based callback: ()      | Handler executed after the share api is resolved.
onShareError   | Promise based callback: (error) | Handler executed after the share api is rejected.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
