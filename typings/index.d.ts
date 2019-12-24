import { EventEmitter } from 'events';

type UniversalOptions = {
  users: () => number;
  guilds: () => number;
  shards?: () => number;
};

declare class ADLAPI extends EventEmitter {
  private token: string;
  private id: string;

  constructor(token: string, id: string, options: ADLAPI.OptionsLayout);

  public postStats(): Promise<object>;

  public on(event: 'posted', listener: () => void): this;
  public on(event: 'error', listener: (error: Error) => void): this;

  private request(method: string, endpoint: string, data?: object): Promise<object>;
}

declare namespace ADLAPI {
  export type OptionsLayout = {
    interval?: number;
    universal: UniversalOptions;
  };
}

export = ADLAPI;
