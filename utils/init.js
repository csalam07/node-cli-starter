import welcome from 'welcome-for-cli';
import unhandledError from 'customize-unhandled-error';

export default ({ clear = true }) => {
  unhandledError();
  welcome({
    title: `create-node-cli`,
    tagLine: `by Awais.dev`,
    description: _description,
    version: _version,
    bgColor: '#6cc24a',
    color: '#000000',
    bold: true,
    clear,
  });
};
