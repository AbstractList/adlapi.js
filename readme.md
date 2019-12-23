# adlapi.js

[![Codacy Badge](https://img.shields.io/codacy/grade/e961cc37da914c658ecc627922f75969?style=flat-square)](https://www.codacy.com/gh/AbstractList/adlapi.js?utm_source=github.com&utm_medium=referral&utm_content=AbstractList/adlapi.js&utm_campaign=Badge_Grade)
[![All Contributors](https://img.shields.io/github/contributors/AbstractList/adlapi.js?style=flat-square)](#contributors-)
[![License](https://img.shields.io/npm/l/adlapi.js?style=flat-square)](https://github.com/AbstractList/adlapi.js/blob/master/LICENSE)
![Downloads](https://img.shields.io/npm/dw/adlapi.js?style=flat-square)
![Package Size](https://img.shields.io/bundlephobia/min/adlapi.js?label=minified%20size&style=flat-square)
[![https://nodei.co/npm/adlapi.js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/adlapi.js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/adlapi.js)

A official package to use Abstract Discord List API. The package is ment to be universal, hence why it uses functions to be able to get your bot's stats without requiring you to specify the client.

## Installation

Use `yarn` or `npm` to install.

NPM:

```bash
npm install adlapi.js
```

Yarn:

```bash
yarn add adlapi.js
```

## Example

Our package is made so you could essentially use any JavaScript-based Discord library, hence why it requires you as the developer to use a function.

```javascript
const Discord = require('discord.js');
const client = new Discord.Client();
const adlapi = require('adlapi.js');
const adl = new adlapi('Your ADL token', client.user.id, {
  universal: {
    users: () => client.users.size,
    servers: () => client.guilds.size,
    /** Shards is optional, example code below
     * shards: () => client.shard.count,
     */
  },
});

// Optional events
adl.on('posted', res => {
  console.log('Posted stats', res);
});

adl.on('error', err => {
  console.error(`An error occured: ${err}`);
});

client.on('ready', () => {
  // Post current stats to the API
  adl.postStats();

  // Every 30 minutes post new stats
  setInterval(() => {
    adl.postStats();
  }, 1000 * 60 * 30); // 30 minutes
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://ur mum"><img src="https://avatars0.githubusercontent.com/u/35403473?v=4" width="100px;" alt=""/><br /><sub><b>dicedtomato</b></sub></a><br /><a href="https://github.com/AbstractList/adlapi.js/commits?author=diced-tomato" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
