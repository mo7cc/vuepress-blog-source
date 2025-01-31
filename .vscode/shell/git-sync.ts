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
  if (error.stdout.toString().includes('nothing to commit, working tree clean')) {
    process.exit(0);
  } else {
    console.error(`git err code: ${error.exitCode}`);
    throw new Error(error.stdout.toString());
  }
}

process.exit(0);
