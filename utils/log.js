import alert from 'cli-alert-msg';

module.exports = (info) => {
  alert({
    type: `warning`,
    name: `DEBUG LOG`,
    msg: ``,
  });

  console.log(info);
  console.log();
};
