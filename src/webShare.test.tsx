import * as React from 'react';
import { shallow } from 'enzyme';

import webShare, { WebShareConfigContainer, WebShareInterface } from './index';

declare var global: any; // tslint:disable-line:no-any

const params = {
  title: 'My share',
  text: 'Check out this amazing react-share-api library',
  url: 'https://github.com/marcolanaro/react-web-share-api',
};

const generator = (shareMethod: string = 'resolve') => {
  const onShareSuccess = jest.fn();
  const onShareError = jest.fn();
  const shareHandler = shareMethod === 'resolve' ? 'ok' : 'shareError';
  const share = jest.fn().mockImplementation(() => Promise[shareMethod](shareHandler));

  global.navigator.share = share;

  const UIComponent: React.StatelessComponent<WebShareInterface> = () => <div />;
  const ShareComponent = webShare<{}>()(UIComponent);
  const wrapper = shallow(
    <ShareComponent config={{ params, onShareSuccess, onShareError }} data-test={true} />
  );
  return {
    onShareSuccess,
    onShareError,
    share,
    UIComponent,
    wrapper,
  };
};

describe('WebShare', () => {
  describe('given an environment with no support for the API', () => {
    const UIComponent = () => <div />;
    const ShareComponent = webShare<{}>()(UIComponent);
    const config = {} as WebShareConfigContainer;
    const wrapper = shallow(<ShareComponent config={config} data-test={true} />);

    it('should render the UI component', () => {
      expect(wrapper.find(UIComponent).length).toBe(1);
    });

    it('should pass to the UI component the custom props', () => {
      expect(wrapper.find(UIComponent).prop('data-test')).toBe(true);
    });

    it('should not pass to the UI component the config prop', () => {
      expect(wrapper.find(UIComponent).prop('config')).toBe(undefined);
    });

    it('should decorate the UI component with "isSupported" = false', () => {
      expect(wrapper.find(UIComponent).prop('isSupported')).toBe(false);
    });

    it('should not decorate the UI component with "share" prop', () => {
      expect(wrapper.find(UIComponent).prop('share')).toBe(undefined);
    });
  });

  describe('given an environment with support for the API', () => {
    it('should render the UI component', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).length).toBe(1);
    });

    it('should pass to the UI component the custom props', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('data-test')).toBe(true);
    });

    it('should not pass to the UI component the config prop', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('config')).toBe(undefined);
    });

    it('should decorate the UI component with "isSupported" = true', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('isSupported')).toBe(true);
    });

    it('should decorate the UI component with "share" prop', () => {
      const { wrapper, UIComponent } = generator();
      expect(wrapper.find(UIComponent).prop('share')).not.toBe(undefined);
    });

    describe('when "share" prop is executed', () => {
      it('should be executed with params', () => {
        const { wrapper, UIComponent, share } = generator();
        wrapper.find(UIComponent).prop('share')();
        expect(share).toHaveBeenCalledWith(params);
      });

      it('should be executed once', () => {
        const { wrapper, UIComponent, share } = generator();
        wrapper.find(UIComponent).prop('share')();
        expect(share).toHaveBeenCalledTimes(1);
      });

      describe('when share API is resolved', () => {
        it('should execute once onShareSuccess', () => {
          const { wrapper, UIComponent, onShareSuccess } = generator();
          wrapper.find(UIComponent).prop('share')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShareSuccess).toHaveBeenCalledTimes(1)
            )
          );
        });

        it('should not executed onShareError', () => {
          const { wrapper, UIComponent, onShareError } = generator();
          wrapper.find(UIComponent).prop('share')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShareError).toHaveBeenCalledTimes(0)
            )
          );
        });
      });

      describe('when share API is rejected', () => {
        it('should execute once onShareError', () => {
          const { wrapper, UIComponent, onShareError } = generator('reject');
          wrapper.find(UIComponent).prop('share')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShareError).toHaveBeenCalledTimes(1)
            )
          );
        });

        it('should execute onShareError with share Error', () => {
          const { wrapper, UIComponent, onShareError } = generator('reject');
          wrapper.find(UIComponent).prop('share')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShareError).toHaveBeenCalledWith('shareError')
            )
          );
        });

        it('should not executed onShareSuccess', () => {
          const { wrapper, UIComponent, onShareSuccess } = generator('reject');
          wrapper.find(UIComponent).prop('share')();
          return Promise.resolve().then(() =>
            Promise.resolve().then(() =>
              expect(onShareSuccess).toHaveBeenCalledTimes(0)
            )
          );
        });
      });
    });
  });
});
