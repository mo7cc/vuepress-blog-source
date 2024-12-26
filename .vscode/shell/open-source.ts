#!bun
import { $ } from 'bun';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

let desc = process.argv[2];
if (!desc) {
  desc = 'open-source-default';
  console.warn(`git commit: ${desc} \n`);
} else {
  console.log(`git commit: ${desc} \n`);
}

const rootPath = process.env.PWD;
if (!rootPath) {
  console.error('rootPath is empty');
  process.exit(1);
}
const cachePath = path.join(rootPath, '.cache');
const loclDepotPath = path.join(cachePath, 'local-source');
const local_remoteDepotPath = path.join(cachePath, 'remote-source');
const gitRemotePath = 'git@github.com:mo7cc/vuepress-blog-source.git';

try {
  await $`rm -rf ${cachePath}`;
  await $`mkdir -p ${loclDepotPath}`;
} catch (error) {
  console.error(`rm err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}
console.log('目录已清空');
const openFile = [
  `${rootPath}/.vscode`,
  `${rootPath}/src`,
  `${rootPath}/package.json`,
  `${rootPath}/.gitignore`,
  `${rootPath}/tsconfig.json`,
  `${rootPath}/.prettierignore`,
  `${rootPath}/.prettierrc.cjs`,
  `${rootPath}/go.mod`,
];
try {
  await $`cp -rf "${rootPath}/private/VuePress_README.md"  "${loclDepotPath}/README.md"`;
  for (let i = 0; i < openFile.length; i++) {
    const el = openFile[i];
    await $`cp -rf "${el}" "${loclDepotPath}/"`;
  }
} catch (error) {
  console.error(`cp err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}
console.log('本地源码构建完成');

$.cwd(cachePath);

try {
  await $`git clone ${gitRemotePath} ${local_remoteDepotPath}`;
  await $`cp -af ${local_remoteDepotPath}/.git "${loclDepotPath}/"`;
  await $`rm -rf ${local_remoteDepotPath}`;
} catch (error) {
  console.error(`git err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}

console.log('git仓库已构建完毕');

$.cwd(loclDepotPath);
const dotGitPath = path.join(loclDepotPath, '.git');
try {
  await $`git add .`;
  await $`git commit -m "${desc}"`;
  await $`git push`;
  await $`rm -rf ${dotGitPath}`;
} catch (error) {
  console.error(`git err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}

console.log(`
推送成功:
https://github.com/mo7cc/vuepress-blog-source
`);
exec('open https://github.com/mo7cc/vuepress-blog-source');

process.exit(0);
