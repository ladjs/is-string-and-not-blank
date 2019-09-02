const path = require('path');
const { readFileSync } = require('fs');
const { Script } = require('vm');
const test = require('ava');
const { JSDOM, VirtualConsole } = require('jsdom');

const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);

const script = new Script(
  readFileSync(
    path.join(__dirname, '..', 'dist', 'is-string-and-not-blank.min.js')
  )
);

const dom = new JSDOM(``, {
  url: 'http://localhost:3000/',
  referrer: 'http://localhost:3000/',
  contentType: 'text/html',
  includeNodeLocations: true,
  resources: 'usable',
  runScripts: 'dangerously',
  virtualConsole
});

dom.runVMScript(script);

test('string and is blank', t => {
  const { isSANB } = dom.window;
  t.false(isSANB(''));
});

test('string and is not blank', t => {
  const { isSANB } = dom.window;
  t.true(isSANB('foo'));
});

test('not string', t => {
  const { isSANB } = dom.window;
  t.false(isSANB([]));
});
