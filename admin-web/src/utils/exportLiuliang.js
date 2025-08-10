const axios = require("axios");

// 定义来源类型和关键字列表
const sourceTypes = ["1", "2"];
const keywords = ["数据科学", "机器学习", "深度学习", "自然语言处理", "计算机视觉", "爬虫", "电商", "算法", "大数据", "云计算", "物联网"];

// 生成随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(count) {
  if (count < 1) {
    console.error("参数 count 的值应大于等于 1");
    return null;
  }

  let numbers = [];
  let remainingSum = 100;

  for (let i = 1; i <= count; i++) {
    // 计算剩余数字的平均值
    let average = remainingSum / (count - i + 1);
    // 生成随机数，范围在1到average之间
    let randomNumber = Math.floor(Math.random() * (average - 1)) + 1;
    // 将生成的随机数添加到数组中
    numbers.push(randomNumber);
    // 更新剩余总和
    remainingSum -= randomNumber;
  }

  return numbers;
}

// 生成随机配置
function generateRandomConfig(url, keywords, sourceTypes, title) {
  const numKeywords = keywords.length;
  const numSources = sourceTypes.length;

  // 拼接生成的配置
  const config = `[${title ? title : url}]\n`;
  const urlConfig = `url=${getRandomInt(1,5)},${getRandomInt(10, 30)}~${getRandomInt(30, 100)},${url}\n`;

  // 生成关键字配置
  const keywordConfigs = [];
  let totalKeywordPercentage = 0;
  let counter = 0;
  let proportions = generateRandomNumbers(numKeywords * numSources);
  for (let i = 0; i < numKeywords; i++) {
    const keyword = keywords[i];

    // 生成每个关键字在每个 sourceType 中的配置
    for (let j = 0; j < numSources; j++) {
      const sourceType = sourceTypes[j];
      const keywordPercentage = proportions[counter];
      counter += 1;
      keywordConfigs.push(`furl=${sourceType},${keywordPercentage},${keyword}`);
      totalKeywordPercentage += keywordPercentage;
    }
  }

  // 子页访问
  const surl = `\nsurl=${getRandomInt(1, 3)}~${getRandomInt(5, 10)},10~40,1,123`;
  return `${config}${urlConfig}${keywordConfigs.join("\n")}${surl}`;
}

// 输入你的 URL 和关键字
// const yourUrl = "https://www.bolzjb.com";
// const yourKeywords = ["电动瓦力.com", "前端开发"];
async function main() {
  const res = await axios.get("http://127.0.0.1:10881/fed-api/v1-0/open/blogArticle/liuliang?pageNum=1&pageSize=50");
  if (res.data.code * 1 === 1) {
    const resText = [];
    res.data.data.records.map((item) => {
      const url = `https://bolzjb.com/archives/${item.urlName}.html`;
      let keyword = item.keywords.replace(/，/g, ",").replace(/、/g, ",").replace(/\s/g, "");
      keyword = keyword.split(",")
      const randomConfig = generateRandomConfig(url, keyword.length > 50 ? keyword.slice(0, 50):  keyword, sourceTypes, item.title);
      resText.push(randomConfig);
    });
    // 生成并输出随机配置
    console.log(resText.join("\n"));
  }
}

main();
