import * as React from 'react';

import {
  WebShareConfig,
  WebShareConfigContainer,
  WebShareInterface,
} from './types';

export const share = (config: WebShareConfig) => () =>
  (navigator as any).share(config.params) // tslint:disable-line:no-any
    .then(config.onShareSuccess)
    .catch(config.onShareError);

const paymentRequest = <TProps extends object>() => (
  // tslint:disable-next-line:no-any
  WrappedComponent: React.ClassType<TProps & WebShareInterface, any, any> | React.SFC<TProps & WebShareInterface>
// tslint:disable-next-line:no-any
): React.ClassType<TProps & WebShareConfigContainer, any, any> => (
  class ExtendedComponent extends React.Component<TProps & WebShareConfigContainer, void> {
    render() {
      const { config, ...passedProps } = this.props as any; // tslint:disable-line:no-any
      const isSupported = (navigator as any).share !== undefined; // tslint:disable-line:no-any
      const supportedProps = isSupported && config
        ? { isSupported, share: share(config) }
        : { isSupported };

      return <WrappedComponent {...passedProps} {...supportedProps} />;
    }
  }
);

export default paymentRequest;
