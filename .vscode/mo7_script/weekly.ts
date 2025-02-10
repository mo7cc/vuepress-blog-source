#!bun
/* 
生成周报 weekly 文件
*/
import { $ } from 'bun';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from 'dayjs/plugin/weekday';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import path from 'path';
import fs from 'fs-extra';
import template from 'art-template';
import axios from 'axios';
import * as cheerio from 'cheerio';

dayjs.extend(weekday); // 加载插件
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
dayjs.locale('zh-cn'); // 设置周一为第一天

//数组洗牌
const shuffle = (arr) => {
  let res: string[] = [];
  let random: number = 0;
  while (arr.length > 0) {
    const randomN = String(Math.random() * arr.length);
    random = parseInt(randomN, 10);
    res.push(arr.splice(random, 1)[0]);
  }
  return res;
};

// 指定范围随机整数
function randomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

console.log(randomNum(0, 2));

// 周列表定义
interface WeekObj {
  year: string;
  date: string; // 日期 2025-01-01
  week: string; // 周一，周二... 周六，周日
  dayOfYear: number; // 当前是一年中的第几天
  dayOfYearProgress: number; // 进度 百分比
  overageDayOfYear: number; // 剩余天数
  Alert: string;
  Text: string;
}

interface DailyQuote {
  title: string;
  date: string;
  en_txt: string;
  zh_txt: string;
  tts: string;
}

class Weekly {
  readonly weekStr = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
  readonly rootPath = path.resolve();
  readonly weeklyDir = './weekly';
  readonly tempPath = path.join(__dirname, 'weekly.md');
  readonly PoetryPath = path.join(__dirname, 'Poetry.md');
  WeekList!: Array<WeekObj>;
  Year: string; // 年份
  WeekIndexOfYear!: number; // 一年中的第几周
  FilePath!: string;
  FileName!: string;
  MdAlert_Label: Array<string>; // GFM 提示
  DailyQuote: {
    [name: string]: DailyQuote;
  };
  Emoji: Array<string>;
  Poetry: Array<string>;
  Aphorism: Array<string>;
  dayObj;
  // date = 2025-2-13
  constructor(date?: string) {
    this.MdAlert_Label = shuffle([
      `[!important] `,
      `[!info] `,
      `[!tip] `,
      `[!info] `,
      `[!note] `,
      `[!note] `,
      `[!important] `,
    ]);
    if (date) {
      this.dayObj = dayjs(date);
    } else {
      this.dayObj = dayjs();
    }
    this.WeekIndexOfYear = this.dayObj.week();
    this.SetWeekList();
    if (this.WeekList.length != this.weekStr.length) {
      throw new Error('WeekList 计算错误');
    }
    if (this.WeekIndexOfYear > 52 / 2) {
      this.Year = this.WeekList[0].year;
    } else {
      this.Year = this.WeekList[this.WeekList.length - 1].year;
    }
    this.SetFileName();
    this.SetFilePath();
  }
  protected SetWeekList() {
    const _this = this;
    const WeekList: Array<WeekObj> = [];
    for (let i = 0; i < _this.weekStr.length; i++) {
      const el = _this.weekStr[i];
      const weekDateObj = _this.dayObj.weekday(i);
      const Obj: WeekObj = {
        year: String(weekDateObj.format('YYYY')),
        date: String(weekDateObj.format('YYYY-MM-DD')),
        week: el,
        dayOfYear: 0,
        overageDayOfYear: 0,
        dayOfYearProgress: 0,
        Alert: `${this.MdAlert_Label[i]}`,
        Text: '',
      };
      Obj.dayOfYear = dayjs(Obj.date).dayOfYear();
      const allDaysOfYear = dayjs(`${Obj.year}-12-31`).dayOfYear();
      Obj.dayOfYearProgress = Math.floor((Obj.dayOfYear / allDaysOfYear) * 100);
      if (Obj.dayOfYearProgress < 1) {
        Obj.dayOfYearProgress = 1;
      }
      Obj.overageDayOfYear = allDaysOfYear - Obj.dayOfYear;
      console.log(Obj.date, Obj.week);
      Obj.Text = `今年的第${Obj.dayOfYear}天，已经度过了今年的${Obj.dayOfYearProgress}%，今年还剩下${Obj.overageDayOfYear}天。`;
      if (Obj.dayOfYear == 1) {
        Obj.Text = `今天是${Obj.year}年的第一天。新的一年开始了！~ ｄ(･∀･\*)♪ ﾟ`;
      }
      if (Obj.overageDayOfYear == 0) {
        Obj.Text = `今天是${Obj.year}年的最后一天。请好好为今年做一下总结吧。 (づ｡◕‿‿◕｡)づ`;
      }

      WeekList.push(Obj);
    }
    _this.WeekList = WeekList;
  }
  protected SetFileName() {
    if (this.Year && this.WeekIndexOfYear) {
      const name = `${this.Year}_${this.WeekIndexOfYear}`;
      this.FileName = `${name}.md`;
    } else {
      throw new Error('必须得先获取年份和第几周');
    }
  }
  protected async SetFilePath() {
    if (!this.weeklyDir) {
      throw new Error('需要设置周记生成目录!');
    }
    if (!this.FileName) {
      throw new Error('必须得先获取FileName');
    }
    const diaryDriPath = path.join(this.rootPath, this.weeklyDir);
    if (!fs.existsSync(diaryDriPath)) {
      await $`mkdir -p ${diaryDriPath}`;
    }
    this.FilePath = path.join(this.rootPath, this.weeklyDir, this.FileName);
    return this.FilePath;
  }
  async GetDailyQuote() {
    const _this = this;
    if (_this.WeekList.length != _this.weekStr.length) {
      throw new Error('WeekList 计算错误');
    }
    const info = {};
    await new Promise<Object>((resolve) => {
      for (const el of _this.WeekList) {
        const url = `http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${el.date}`;
        axios.get(url).then((res) => {
          const obj: DailyQuote = {
            title: '',
            date: '',
            en_txt: '',
            zh_txt: '',
            tts: '',
          };
          if (res.data.errno == 0) {
            obj.title = res.data.caption;
            obj.date = res.data.title;
            obj.en_txt = res.data.content;
            obj.zh_txt = res.data.note;
            obj.tts = res.data.tts;
          }
          info[el.date] = obj;
          if (Object.keys(info).length == _this.WeekList.length) {
            _this.DailyQuote = info;
            resolve(info);
          }
        });
      }
    });
  }
  async GetEmoticon() {
    const _this = this;
    const time = new Date();
    await new Promise((resolve) => {
      axios.get(`https://facemood.grtimed.com?t=${time}`).then((res) => {
        const $ = cheerio.load(res.data);
        const Elms = $('.container .emoji-wrap .row h2');
        for (const elm of Elms) {
          const text = $(elm).text().replace(/\s*/g, '');
          if (text == '隨機顏文字') {
            const emojiElm = $(elm).parents('.emoji-wrap').find('.emoji-text');
            const emojiTxt = emojiElm.text();
            _this.Emoji = _this.EmojiFormat(emojiTxt);
            resolve(_this.Emoji);
          }
        }
      });
    });
  }
  protected EmojiFormat(str) {
    const arr1 = str.split('\n');
    const reg = /^\s+|\s+$/g;
    const returnArr: Array<string> = [];
    for (const el of arr1) {
      const str = el.replace(reg, '');
      if (str) {
        returnArr.push(` ${str} `);
      }
    }
    return returnArr;
  }
  async GetPoetry() {
    const PoetryMd = await fs.readFileSync(this.PoetryPath);
    const str = String(PoetryMd);
    const arr1 = str.split('\n');
    const reg = /^\s+|\s+$/g;
    const Poetry: Array<string> = [];
    const Aphorism: Array<string> = [];
    for (const el of arr1) {
      const str = el.replace(reg, '');
      if (str && !str.includes('#')) {
        if (str.includes('——')) {
          const p = str.split('. ')[1].replace(reg, '');
          Poetry.push(p);
        } else {
          Aphorism.push(str);
        }
      }
    }
    this.Poetry = shuffle(Poetry);
    this.Aphorism = shuffle(Aphorism);
  }
  async CreateFile() {
    if (!this.FilePath) {
      throw new Error('文件路径有问题');
    }

    if (!fs.existsSync(this.tempPath)) {
      throw `
缺少模板文件:
${this.tempPath}
`;
    }
    if (fs.existsSync(this.FilePath)) {
      throw `
文件已存在，无需重复创建:
${this.FilePath}
`;
    }

    await this.GetDailyQuote();
    await this.GetEmoticon();
    await this.GetPoetry();

    const AphorismIdx = randomNum(0, this.Aphorism.length - 1);

    const fileContent = template(this.tempPath, {
      Year: this.Year,
      WeekIndexOfYear: this.WeekIndexOfYear,
      WeekList: this.WeekList,
      Emoji: this.Emoji,
      DailyQuote: this.DailyQuote,
      PoetryArr: this.Poetry,
      Aphorism: this.Aphorism[AphorismIdx],
    });

    fs.writeFileSync(this.FilePath, fileContent);

    console.log(`
文件已生成:
${this.FilePath}
`);
  }
}

const WeeklyObj = new Weekly();

await WeeklyObj.CreateFile();
