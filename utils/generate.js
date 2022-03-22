import ora from 'ora';
import { join, basename } from 'path';
import execa from 'execa';
import alert from 'cli-alert-msg';
import copy from 'copy-template-dir';
import { green as g, yellow as y, dim as d } from 'chalk';

const spinner = ora({ text: '' });
import questions from './questions';

export default async () => {
  const vars = await questions();
  const outDir = vars.name;
  const inDirPath = join(__dirname, `../template`);
  const outDirPath = join(process.cwd(), outDir);

  copy(inDirPath, outDirPath, vars, async (err, createdFiles) => {
    if (err) throw err;

    console.log(d(`\nCreating files in ${g(`./${outDir}`)} directory:\n`));

    createdFiles.forEach((filePath) => {
      const fileName = basename(filePath);
      console.log(`${g(`CREATED`)} ${fileName}`);
    });

    console.log();
    spinner.start(
      `${y(`DEPENDENCIES`)} installing…\n\n${d(`It may take moment…`)}`,
    );
    process.chdir(outDirPath);
    const pkgs = [
      `meow@9.0.0`,
      `chalk@latest`,
      `cli-alerts@latest`,
      `cli-welcome@latest`,
      `cli-meow-help@latest`,
      `cli-handle-error@latest`,
      `cli-handle-unhandled@latest`,
    ];

    await execa(`npm`, [`install`, ...pkgs]);
    await execa(`npm`, [`install`, `prettier`, `-D`]);
    await execa(`npm`, [`dedupe`]);
    spinner.succeed(`${g(`DEPENDENCIES`)} installed!`);

    alert({
      type: `success`,
      name: `ALL DONE`,
      msg: `\n\n${createdFiles.length} files created in ${d(
        `./${outDir}`,
      )} directory`,
    });
  });
};
