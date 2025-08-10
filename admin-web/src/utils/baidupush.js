const axios = require('axios');
/**
 *  分类
    'https://www.bolzjb.com/category/2954937509122932736.html',
    'https://www.bolzjb.com/category/2954937466366197760.html',
    'https://www.bolzjb.com/category/2954937441280065536.html',
    'https://www.bolzjb.com/category/2954937416651112448.html',
    'https://www.bolzjb.com/category/2954937393997676544.html',
    'https://www.bolzjb.com/category/2954937372560588800.html',
    'https://www.bolzjb.com/category/2954937335512301568.html',
    'https://www.bolzjb.com/category/2957523476828651520.html'
 */
async function postUrls() {
  // 请求的参数
  const urls = [
    // 'https://www.bolzjb.com/archives/gevtgKYv.html',
    // 'https://www.bolzjb.com/archives/ux7HUr9g.html',
    // 'https://www.bolzjb.com/archives/HBFiys_t.html',
    // 'https://www.bolzjb.com/archives/w9CmgV8a.html',
    // 'https://www.bolzjb.com/archives/08OF5SHC.html',
    // 'https://www.bolzjb.com/archives/eYaNJjGa.html',
    // 'https://www.bolzjb.com/archives/F3YOztwD.html',
    // 'https://www.bolzjb.com/archives/gX8FNrlD.html',
    // 'https://www.bolzjb.com/archives/20.html',
    // 'https://www.bolzjb.com/archives/LihHajmV.html'
  ]


  const res = await axios.get('https://lxcb-wxapi.bolzjb.com/fed-api/v1-0/open/blogArticle/page?pageNum=1&pageSize=1000')
  if (res.data.code * 1 === 1) {
    res.data.data.records.map(item => {
      urls.push(`https://bolzjb.com/archives/${item.urlName}.html`)
    })
  }

  const params = urls.join('\n')
  ;

  // Axios POST 请求配置
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'curl/7.12.1',
      'Host': 'data.zz.baidu.com',
    }
  };

  // 发送 POST 请求
  axios.post('http://data.zz.baidu.com/urls?site=https://bolzjb.com&token=Y1ym6cGOX1WfLAb5', params, config)
    .then(response => {
      // 请求成功处理
      console.log('Response:', response.data);
    })
    .catch(error => {
      // 请求失败处理
      console.error('Error:', error.message);
    });
}

// 调用函数
postUrls();
