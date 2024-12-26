#!bun
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from 'dayjs/plugin/weekday';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';

import path from 'path';
import fs from 'fs';
import template from 'art-template';

//数组洗牌
const shuffle1 = (arr) => {
  let res: string[] = [];
  let random: number = 0;
  while (arr.length > 0) {
    const randomN = String(Math.random() * arr.length);
    random = parseInt(randomN, 10);
    res.push(arr.splice(random, 1)[0]);
  }
  return res;
};

const __dirname = path.resolve();
dayjs.extend(weekday); // 加载插件
dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);
dayjs.locale('zh-cn'); // 设置周一为第一天

let MdAlert_Label = [
  // ...
  `[!important] `,
  `[!info] `,
  `[!tip] `,
  `[!warning] `,
  `[!info] `,
  `[!caution] `,
  `[!important] `,
];

MdAlert_Label = shuffle1(MdAlert_Label);

let MdAlert_Emoticons = [
  // ...
  ` ~ ｄ(･∀･\*)♪ ﾟ`,
  ` ✿ ヾ(^▽^ヾ)`,
  ` ٩(◕‿◕｡)۶`,
  ` 〈( ^.^)ノ`,
  ` (●´∀ ｀ ●)ﾉ`,
  ` (づ｡◕‿‿◕｡)づ`,
  ` (ﾉ◕ヮ◕)ﾉ`,
];
MdAlert_Emoticons = shuffle1(MdAlert_Emoticons);

let MdAlert_Txt = [
  // ...
  `脚踏实地，稳步向前~`,
  `一日之计在于晨。`,
  `年复一年，奋勇向前 ！`,
  `从事武德最本质开始思考。`,
  `日拱一卒，功不唐捐。`,
  `你最大的冒险，就是过梦想中的生活。`,
  `一个人对奇迹的信念，永远是奇迹产生的前提。`,
];
MdAlert_Txt = shuffle1(MdAlert_Txt);

interface WeekListType {
  date: string;
  week: string;
  dayOfYear: number;
  CurrentProgress: number;
  RemainingDayOfYear: number;
  MdAlert: string;
}

const dayObj = dayjs(); // 设定日期为今天
const nowYear = dayObj.year(); // 获取当前年份
const localPath = path.join(__dirname, 'diary'); // 设定目录

const dayMs = 1000 * 60 * 60 * 24;

const weekNumForYear = dayObj.week(); // 获取当前是该年的第几周
// 获取今年最后一天的日期对象
const lastDayOfYeay = dayjs(`${nowYear}-12`).endOf('month');
const startDayOfYeay = dayjs(`${nowYear}-1`).startOf('month');
const AllDaysOfYear = Math.ceil((lastDayOfYeay.valueOf() - startDayOfYeay.valueOf()) / dayMs);

// 获取当前星期列表
const weekStr = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];

const weekList: WeekListType[] = [];
for (let i = 0; i < weekStr.length; i++) {
  const el = weekStr[i];
  const weekDateObj = dayObj.weekday(i);

  const dayOfYear = weekDateObj.dayOfYear();
  const CurrentProgress = Math.ceil((dayOfYear / AllDaysOfYear) * 100);
  const RemainingDayOfYear = AllDaysOfYear - dayOfYear;
  const MdAlert = `${MdAlert_Label[i]}${MdAlert_Txt[i]}${MdAlert_Emoticons[i]}`;

  weekList.push({
    date: weekDateObj.format('YYYY-MM-DD'),
    week: el,
    dayOfYear,
    CurrentProgress,
    RemainingDayOfYear,
    MdAlert,
  });
}

// 当前的日期
const date = dayObj.format('YYYY-MM-DD');

// 当前是周几
const nowWeekNum = dayObj.day();

let nowWeekNumIdx = nowWeekNum - 1;
if (nowWeekNumIdx < 0) {
  nowWeekNumIdx = 6;
}
const nowWeekStr = weekStr[nowWeekNumIdx];

// 文件目录
const Year = dayObj.format('YYYY');
const fileName = `${Year}_${weekNumForYear}`;
const filePath = path.join(localPath, `${fileName}.md`);

// 输出结果：
const bannerStr = `
今天是 ${date} ${nowWeekStr}, 是今年的第 ${weekNumForYear} 周, 
本周的日期结构如下:
`;

console.info(bannerStr);

console.info(weekList);

console.info(fileName);

console.info(`文件目录为: ${filePath}`);

const isExist = fs.existsSync(filePath);
if (isExist) {
  console.warn('当前文件已存在，无需重复写入。');
  process.exit(0);
}

console.log('正在生成模板');

const tempPath = path.join(__dirname, '.vscode', 'shell', 'weekly.md');
const fileContent = template(tempPath, {
  year: Year,
  weekly: weekNumForYear,
  weekList: weekList,
});

fs.writeFileSync(filePath, fileContent);
console.info('文件写入完成:', filePath);
process.exit(0);
