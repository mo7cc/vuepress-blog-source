# {{Year}} 年 第 {{WeekIndexOfYear}} 周

> [!important] 新的一周开始啦 {{Emoji[8]}}
>
> {{Aphorism}}

- **今年的主要目标:**

  - ✍ [进度]
  - ✍ [进度]

- **本周的主要目标:**

  - ✍ [进度]
  - ✍ [进度]

- **本周的次要目标:**

  - ✍ [进度]
  - ✍ [进度]

---

<% for(let i = 0; i < WeekList.length; i++){ %>

## {{WeekList[i].date}} {{WeekList[i].week}}

> {{WeekList[i].Alert}} {{DailyQuote[WeekList[i].date].zh_txt}} {{Emoji[i]}}
>
> <audio controls src="{{DailyQuote[WeekList[i].date].tts}}"></audio> \
> {{DailyQuote[WeekList[i].date].en_txt}}
>
> > {{PoetryArr[i]}}
>
> {{WeekList[i].Text}}

- 天气: ✍
- 心情: ✍
- 特殊日子: ✍
- 起床时间: ✍
- 起床称重: ✍ 斤， ✍
- [ ] 设定今日的番茄钟

### 今日九宫格

- **投资理财方面:**  
  ✍
- **今天做了哪些事:**  
  ✍
- **工作/副业方面:**  
  ✍
- **身体健康方面:**  
  ✍
- **人际关系方面:**  
  ✍
- **学习/成长方面:**  
  ✍
- **娱乐休息方面(开心的事情):**  
  ✍
- **成功日记:**  
  ✍
- **反思日记:**  
  ✍

---

<% } %>

# 周总结 ( {{WeekList[0].date}} 至 {{WeekList[WeekList.length-1].date}} )

## 本周经济情况:

✍

## 本周已完成:

✍

## 工作和副业方面:

✍

## 健康方面:

✍

## 人际关系方面:

✍

## 值得开心的事情:

✍

## 学习成长方面:

✍

## 值得表扬的地方:

✍

## 需要批评和反思的地方:

✍

## 下周的计划:

✍
