#!bun
import { $ } from 'bun';
import { myInit } from './config';

await myInit();

let desc = process.argv[2];
if (!desc) {
  desc = 'sync-commit-default';
  console.warn(`git commit: ${desc} \n`);
} else {
  console.log(`git commit: ${desc} \n`);
}

try {
  await $`git pull`;
  await $`git add .`;
  await $`git commit -m "${desc}"`;
  await $`git push`;
} catch (error) {
  console.error(`git err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}

process.exit(0);
