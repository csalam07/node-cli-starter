#!/usr/bin/env node

import init from './utils/init';
import cli from './utils/cli';
import log from './utils/log';
import generate from './utils/generate';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
  init({ clear });
  input.includes('help') && cli.showHelp(0);
  debug && log(flags);

  await generate();
})();
