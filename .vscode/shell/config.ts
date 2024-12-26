import os from 'os';
import { $ } from 'bun';
import path from 'path';

const GitUserName = '墨七';
const GitEmail = 'meichangliang@outlook.com';

export const pathSpace = {
  rootPath: '',
  distPath: '',
};

const filePermissions777 = async () => {
  const sysType = os.platform();
  if (sysType == 'darwin' || sysType == 'linux') {
    await $`chmod -R 777 ./`;
    console.log('文件权限已重置');
  }
};

const git_LocalConfig = [
  // 设置大小写敏感
  'config core.ignorecase false',

  // 忽略文件权限变更
  'config core.filemode false',

  // 禁用 pull.rebase
  'config pull.rebase false',
];
const git_GlobalConfig = [
  // 查看当前安装的 "版本
  'version',

  // 设置用户名（把 墨七 替换成你自己的名字）
  `config --global user.name ${GitUserName}`,

  // 查看设置好的用户名
  'config user.name',

  // 设置邮箱(替换成你自己的邮箱)
  `config --global user.email ${GitEmail}`,

  // 查看设置好的邮箱
  'config user.email',

  // 禁用 pull.rebase
  'config --global pull.rebase false',

  // 设置大小写敏感
  'config --global core.ignorecase false',

  // 禁用中文转码
  'config --global core.quotepath false',

  // 提交时转换为 LF，检出时不转换
  'config --global core.autocrlf input',

  // 提交包含混合换行符的文件发出警告
  'config --global core.safecrlf warn',

  // 忽略文件权限的变更(全局)
  'config --global core.filemode false',

  // 设置 init 时 默认分支为 main
  'config --global init.defaultBranch main',

  // 关闭分支显示分页 显示
  'config --global pager.branch false',
];

const SetGitLocalConfig = async () => {
  try {
    await $`git config core.ignorecase false`;
    await $`git config core.filemode false`;
    await $`git config pull.rebase false`;
    console.log('本地 git config 已覆盖');
  } catch (error) {
    console.error(`git err code: ${error.exitCode}`);
    console.info(error.stdout.toString());
    console.info(error.stderr.toString());
    process.exit(1);
  }
};

const SetGitGlobalConfig = async () => {
  try {
    await $`git version`;
    await $`git config --global user.name ${GitUserName}`;
    await $`git config user.name`;
    await $`git config --global user.email ${GitEmail}`;
    await $`git config user.email`;
    await $`git config --global pull.rebase false`;
    await $`git config --global core.ignorecase false`;
    await $`git config --global core.quotepath false`;
    await $`git config --global core.autocrlf input`;
    await $`git config --global core.safecrlf warn`;
    await $`git config --global core.filemode false`;
    await $`git config --global init.defaultBranch main`;
    await $`git config --global pager.branch false`;
    console.log('全局 git config 已覆盖');
  } catch (error) {
    console.error(`git err code: ${error.exitCode}`);
    console.info(error.stdout.toString());
    console.info(error.stderr.toString());
    process.exit(1);
  }
};

export const sleep = (ms) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};

export const myInit = async () => {
  await filePermissions777();
  await SetGitGlobalConfig();
  await SetGitLocalConfig();
  const rootPath = process.cwd();
  if (!rootPath) {
    console.error('rootPath is empty');
    process.exit(1);
  }
  const distPath = path.join(rootPath, 'dist');
  pathSpace.rootPath = rootPath;
  pathSpace.distPath = distPath;
  console.log('变量已设置');
};
