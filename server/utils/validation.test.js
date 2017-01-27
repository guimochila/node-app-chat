const expect = require('expect');
const { isRealString } = require('./validation');

describe('Validation.js - isRealString', () => {
  it('should reject non-strings value', () => {
    var res = isRealString(123);

    expect(res).toBe(false);
  });

  it('should reject string with only whitespaces', () => {
    var res = isRealString('    ');
    
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString('User');

    expect(res).toBe(true);
  });
});
