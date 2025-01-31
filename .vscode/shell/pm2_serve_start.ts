#!bun
import { $ } from 'bun';

const v2rayNPath = '/Users/meichangliang/Library/CloudStorage/OneDrive-个人/Software-macOS/v2rayN-macos-arm64/v2rayN';

try {
  await $`pm2 kill`;
  await $`pm2 start ${v2rayNPath} --no-autorestart`;
} catch (error) {
  console.error(`run-build err code: ${error.exitCode}`);
  console.info(error.stdout.toString());
  console.info(error.stderr.toString());
  process.exit(1);
}
