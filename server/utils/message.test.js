const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('Generate Message', () => {
  it('should generate correct message object', () => {
    const from = 'Admin';
    const text = 'Message created'

    const message = generateMessage(from, text);

    expect(message.createAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
    expect(message.from).toMatch(from);
    expect(message.text).toMatch(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Admin'
    const latitude = 1;
    const longitude = 2;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const location = generateLocationMessage(from, latitude, longitude);

    expect(location.createAt).toBeA('number');
    expect(location).toInclude({
      from,
      url
    });
    expect(location.url).toMatch(url);
    
  });
})
