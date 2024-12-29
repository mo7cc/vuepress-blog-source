#!bun
import { $ } from 'bun';
import axios from 'axios';
import os from 'os';
import fs from 'fs-extra';
import { exec } from 'child_process';
import { sleep } from './config';

const sysType = os.platform();

if (sysType != 'linux') {
  const Url = 'https://go.dev/dl/';
  console.log(`
此脚本仅支持 x64 或 arm64 架构的 Linux 系统
window 或 macOS 请访问 
${Url}
进行手动下载安装。
`);

  exec(`start ${Url}`);
  await sleep(500);
  process.exit(0);
}

let goNowVersion = '';
const getGolangLastVersion = async () => {
  const res = await axios.get('https://go.dev/dl/?mode=json');
  if (res.data && res.data.length > 0) {
    const nowVersion = res.data[0];
    if (nowVersion.stable) {
      goNowVersion = nowVersion.version;
    } else {
      console.error('stable 状态异常：', nowVersion.stable);
      process.exit(0);
    }
  } else {
    console.error('访问 https://go.dev 失败');
    process.exit(0);
  }
};
await getGolangLastVersion();

if (!goNowVersion) {
  console.error('版本号获取失败');
  process.exit(0);
}

const x86_64Url = `https://dl.google.com/go/${goNowVersion}.linux-amd64.tar.gz`;

const arm64Url = `https://dl.google.com/go/${goNowVersion}.linux-arm64.tar.gz`;

const archVal = os.arch();

let DownloadUrl = '';
if (archVal == 'x64') {
  DownloadUrl = x86_64Url;
} else if (archVal == 'arm64') {
  DownloadUrl = arm64Url;
} else {
  console.error('无法识别的 arch');
  process.exit(0);
}
console.log('开始下载文件');
try {
  await $`curl -o "goPackage" "${DownloadUrl}"`;
} catch (error) {
  console.error(`curl err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}

const installDir = '/usr/lib/go';
if (fs.existsSync(installDir)) {
  console.log('删除老旧的版本');
  try {
    await $`rm -rf /usr/lib/go`;
  } catch (error) {
    console.error(`curl err code: ${error.exitCode}`);
    console.info(error.stdout.toString());
    console.info(error.stderr.toString());
    process.exit(1);
  }
}

const isInstallTar = $`which tar`.text();

if (!isInstallTar) {
  console.error(`你可能需要先安装 tar 命令以及 sudo 权限`);
  process.exit(1);
}

console.log('开始解压安装');
try {
  await $`sudo tar -zxvf goPackage -C /usr/lib`;
} catch (error) {
  console.error(`curl err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}
await $`rm -rf goPackage`;

console.log(`
检查 go 环境变量
`);
const etc_profile = '/etc/profile';
fs.readFile(etc_profile, 'utf8', (err, data) => {
  if (err) {
    console.error(`文件读取失败`);
    process.exit(1);
  }

  if (data.indexOf(installDir) > -1) {
    console.log('环境变量已设置，安装&升级已完成');
    process.exit(0);
  }

  const newFilCont = `${data}
# go 环境变量
export GOROOT=${installDir}
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
`;

  console.log('开始写入环境变量');
  fs.writeFileSync(etc_profile, newFilCont);
  console.log(`
环境变量已设置，安装&升级已完成
请重启机器或者执行:
source ${etc_profile}
`);
});
