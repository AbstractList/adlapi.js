const fakeStats = {
  users: 0,
  guilds: 0,
};

const adlapijs = require('../lib');
const adl = new adlapijs('ADL token', 'Bot ID', {
  universal: {
    users: () => fakeStats.users,
    guilds: () => fakeStats.guilds,
  },
});

describe('postStats', () => {
  test('should get 404 or 429 status code, check for 400 > status code', () => {
    adl.on('posted', res => console.log('Posted stats', res));
    adl.on('error', err => {
      expect(err.statusCode).toBeGreaterThan(400);
    });
  });

  adl.postStats();
});
