import { EventEmitter } from 'events';

interface UniversalOptions {
  users: Function;
  guilds: Function;
  shards?: Function;
}

declare class ADLAPI extends EventEmitter {
  constructor(token: string, id: string, options: ADLAPI.OptionsLayout);

  private token: string;
  private id: string;

  public postStats(): Promise<object>;

  private request(method: string, endpoint: string, data?: object): Promise<object>;

  public on(event: 'posted', listener: () => void): this;
  public on(event: 'error', listener: (error: Error) => void): this;
}

declare namespace ADLAPI {
  export type OptionsLayout = {
    interval?: number;
    universal: UniversalOptions;
  };
}

export = ADLAPI;
