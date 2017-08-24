import * as React from 'react';
import webShare, { WebShareInterface } from 'react-web-share-api';

export interface OwnProps {
  style: object;
}

const Button: React.StatelessComponent<WebShareInterface & OwnProps> = ({
  share, isSupported, style,
}) => isSupported
  ? <button onClick={share} style={style}>Share now!</button>
  : <span>Web Share not supported</span>;

export default webShare<OwnProps>()(Button);
