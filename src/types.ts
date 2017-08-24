export interface WebShareConfig {
  params: {
    title: string;
    text?: string;
    url?: string;
  };
  onShareSuccess: () => void;
  onShareError: (error: Error) => void;
}

export interface WebShareConfigContainer {
  config: WebShareConfig;
}

export interface WebShareInterface {
  isSupported: boolean;
  share: () => void;
}
