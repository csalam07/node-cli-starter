import os from 'os';
import path from 'path';
import fs from 'fs';
import { Input } from 'enquirer';
import to from 'await-to-js';
import handleError from 'error-handle-cli';
import cancelledCli from 'cancelled-cli';
import { Store } from 'data-store';

to.defaults;

module.exports = async ({ name, message, hint, initial }) => {
  let history = false;
  if (
    !initial &&
    name !== `name` &&
    name !== `command` &&
    name !== `description`
  ) {
    history = {
      autosave: true,
      store: new Store({
        path: path.join(os.homedir(), `.history/create-node-cli/${name}.json`),
      }),
    };
  }
  const [err, response] = await to(
    new Input({
      name,
      message,
      hint,
      initial,
      history,
      validate(value, state) {
        if (state && state.name === `command`) return true;
        if (state && state.name === `name`) {
          if (fs.existsSync(value)) {
            return `Directory already exists: ./${value}`;
          } else {
            return true;
          }
        }
        return !value ? `Please add a value.` : true;
      },
    })
      .on(`cancel`, () => cancelledCli())
      .run(),
  );
  handleError(`INPUT`, err);

  return response;
};
