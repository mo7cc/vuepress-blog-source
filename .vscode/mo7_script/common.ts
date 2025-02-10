/* 
公共函数
*/

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

const SetGitLocalConfig = async () => {
  try {
    // 开启当前项目 git 大小写敏感
    await $`git config core.ignorecase false`;
    // 忽略当前项目文件权限变更
    await $`git config core.filemode false`;
    // 禁用当前项目 pull.rebase
    await $`git config pull.rebase false`;
    console.log('本地 git config 已覆盖');
  } catch (error) {
    console.error(`git err code: ${error.exitCode}`);
    console.info(error.stdout.toString());
    console.info(error.stderr.toString());
    process.exit(1);
  }
};

// Git 全局设置
const SetGitGlobalConfig = async () => {
  try {
    // 查看当前安装的 git 版本
    await $`git version`;
    // 设置git用户名
    await $`git config --global user.name ${GitUserName}`;
    await $`git config user.name`;
    // 设置git提交邮箱
    await $`git config --global user.email ${GitEmail}`;
    await $`git config user.email`;
    // 禁用 pull.rebase
    await $`git config --global pull.rebase false`;
    // 设置大小写敏感
    await $`git config --global core.ignorecase false`;
    // 禁用中文转码
    await $`git config --global core.quotepath false`;
    // 提交时转换为 LF，检出时不转换
    await $`git config --global core.autocrlf input`;
    // 提交包含混合换行符的文件发出警告
    await $`git config --global core.safecrlf warn`;
    // 忽略文件权限的变更(全局)
    await $`git config --global core.filemode false`;
    // 设置 init 时 默认分支为 main
    await $`git config --global init.defaultBranch main`;
    // 关闭分支显示分页 显示
    await $`git config --global pager.branch false`;

    console.log('git config 已覆盖');
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
