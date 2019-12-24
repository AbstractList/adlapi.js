import { EventEmitter } from 'events';
import fetch from 'node-fetch';

interface UniversalOptions {
  users: () => number;
  guilds: () => number;
  shards?: () => number;
}

interface OptionsLayout {
  // interval: number;
  universal: UniversalOptions;
}

export default class ADLAPI extends EventEmitter {
  private token: string;
  private id: string;
  private options: OptionsLayout;
  /**
   * Creates new ADLAPI instance.
   * @param {string} token Your ADL token.
   * @param {string} id Your bot's id.
   * @param {OptionsLayout} [options] Options.
   * @param {function} [options.universal.users] The user amount function
   * @param {function} [options.universal.guilds] The guilds amount function
   * @param {function} [options.universal.shards] The shards amount function
   */

  // @param {number} [options.interval=1800000] How often to post stats, minumum is 1800000, (which is also the default value)
  constructor(token: string, id: string, options: OptionsLayout) {
    super();
    this.token = token;
    this.id = id;
    this.options = options;

    // if (!this.options.interval) {
    //   this.options.interval = 1000 * 60 * 30;
    // } else if (this.options.interval < 1000 * 60 * 30) {
    //   throw new Error('Intervals must be over 1800000 ms, (30 minutes)');
    // }

    if (!this.options.universal) throw new Error('Universal functions needs to be specified!');
    if (!this.options.universal.users) throw new Error('Universal users function needs to be specified!');
    if (!this.options.universal.guilds) throw new Error('Universal guilds function needs to be specified!');
    if (!this.checkUniversal()) throw new Error('Universal functions did not return a Number!');
  }
  /**
   * Posts your bots stats to ADL API
   */
  public async postStats() {
    if (!this.checkUniversal()) throw new Error('Universal Functions do not return a Number.');

    const data = {
      servers: this.getGuilds(),
      users: this.getUsers(),
    };

    if (this.options.universal.shards) {
      // @ts-ignore
      data.shards = this.getShards();
    }
    const json = await this.request(`/bot/${this.id}/stats`, 'POST', data);

    this.emit('posted', json);
    return json;
  }

  private checkUniversal() {
    const guilds = typeof this.getGuilds() === 'number';
    const users = typeof this.getUsers() === 'number';
    const shards = typeof this.getShards() === 'number';

    if (guilds && users && shards) return true;
    else return false;
  }

  private getGuilds() {
    return this.options.universal.guilds();
  }

  private getUsers() {
    return this.options.universal.users();
  }

  private getShards() {
    if (!this.options.universal.shards) return 0;
    return this.options.universal.shards();
  }

  // Will have to allow users that have token to view other bots stats
  private async request(endpoint: string, method: string, data: any = null) {
    // Need a way to make like on get request to make data to query
    // Else keep the data in the body
    const res = await fetch('https://abstractlist.net/api' + endpoint, {
      body: !data ? undefined : JSON.stringify(data),
      headers: {
        Authorization: `${this.token}`,
        'Content-Type': 'application/json',
      },
      method,
    });

    // it will check if its 200 or not
    // or check if the response has error in its load, a success response doesnt have error
    const json = JSON.parse(await res.text());

    if (!res.ok) this.emit('error', json);

    return json;
  }
}
