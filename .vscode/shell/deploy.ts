#!bun
import { $ } from 'bun';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

let desc = process.argv[2];
if (!desc) {
  desc = 'deploy-default-desc';
  console.warn(`git commit: ${desc} \n`);
} else {
  console.log(`git commit: ${desc} \n`);
}

const rootPath = process.env.PWD;
if (!rootPath) {
  console.error('rootPath is empty');
  process.exit(1);
}
const distPath = path.join(rootPath, 'dist');
const GitRemotePath = 'git@github.com:mo7cc/mo7cc.github.io.git';

try {
  await $`bun run build`;
} catch (error) {
  console.error(`run-build err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}

if (!fs.existsSync(distPath)) {
  console.error('dist 目录不存在');
  process.exit(1);
}

$.cwd(distPath);
const dotGitPath = path.join(distPath, '.git');
try {
  await $`git init`;
  await $`git add .`;
  await $`git commit -m "${desc}"`;
  await $`git remote add origin "${GitRemotePath}"`;
  await $`git push -f --set-upstream origin main:main`;
  await $`rm -rf ${dotGitPath}`;
} catch (error) {
  console.error(`git err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}

console.log(`
发布成功:
https://github.com/mo7cc/mo7cc.github.io
https://mo7.cc
`);
exec('open https://mo7.cc');
exec('open https://github.com/mo7cc/mo7cc.github.io');

process.exit(0);
