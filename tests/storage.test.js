const test = require('node:test');
const assert = require('node:assert/strict');
const { appendRegistration, normalizeEntries } = require('../storage');

test('normalizes invalid stored values into an array', () => {
  assert.deepStrictEqual(normalizeEntries(null), []);
  assert.deepStrictEqual(normalizeEntries('bad'), []);
  assert.deepStrictEqual(normalizeEntries([{ name: 'A' }]), [{ name: 'A' }]);
});

test('prepends a new registration and keeps the newest 100 entries', () => {
  const existing = [{ name: 'First' }, { name: 'Second' }];
  const next = appendRegistration(existing, { name: 'Third' });

  assert.deepStrictEqual(next[0], { name: 'Third' });
  assert.equal(next.length, 3);
  assert.deepStrictEqual(next.slice(1), [{ name: 'First' }, { name: 'Second' }]);

  const many = Array.from({ length: 105 }, (_, index) => ({ name: `Entry ${index + 1}` }));
  const trimmed = appendRegistration(many, { name: 'Newest' });
  assert.equal(trimmed.length, 100);
  assert.deepStrictEqual(trimmed[0], { name: 'Newest' });
  assert.equal(trimmed[99].name, 'Entry 104');
});
