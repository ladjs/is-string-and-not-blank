const test = require('ava');
const Benchmark = require('benchmark');

const regex = require('whitespace-regex')();
const isSANB = require('..');

test('string and is blank', t => {
  t.false(isSANB(''));
});

test('string and is not blank', t => {
  t.true(isSANB('foo'));
});

test('not string', t => {
  t.false(isSANB([]));
});

test.cb('faster than whitespace-regex', t => {
  const suite = new Benchmark.Suite();
  const str = 'foo';
  suite
    .add('whitespace-regex ', () => typeof str === 'string' && !regex.test(str))
    .add('is-string-and-not-blank', () => isSANB(str))
    .on('cycle', event => {
      t.log(String(event.target));
    })
    .on('complete', function() {
      t.true(
        this.filter('fastest').map('name')[0] === 'is-string-and-not-blank'
      );
      t.end();
    })
    .run({ async: true });
});
