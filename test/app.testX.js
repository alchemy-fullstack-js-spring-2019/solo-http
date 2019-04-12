const request = require('supertest');
const { app } = require('../lib/app');

describe('app route', () => {
  it('birthday route working', () => {
    return request(app)
      .get('/birthday')
      .then(res => {
        const html = `
      <html>
        <head>
          <title>HBD</title>
        </head>
        <body>
          <h1>HAPPY BIRTHDAY</h1>
        </body>
      </html>
      `;
        expect(res.text).toEqual(html);
      });
  });

  it.only('match that test JSON', () => {
    return request(app)
      .get('/tester')
      .then(res => {
        expect(res.body).toEqual('{ testing: 123 }');
      });
  });

});
