const expect = require('expect');

const { generateMessage } = require('./message');

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
