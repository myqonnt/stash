let url = "http://ip-api.com/json/?fields=8450015&lang=zh-CN"

let message = {
  'title': 'IP 信息',
  'content': '',
};

function handleError(error) {
  if (Array.isArray(error)) {
    console.log(`错误：${error[0]} ${error[1]}`);
    return {
      title: '加密货币汇率',
      content: `错误：${error[0]} ${error[1]}`,
      icon: 'simcard',
      'icon-color': '#CB1B45',
    }
  } else {
    console.log(`错误：${error}`);
    return {
      title: '加密货币汇率',
      content: `错误：${error}`,
      icon: 'simcard',
      'icon-color': '#CB1B45',
    }
  }
}

async function fetch() {
  return new Promise((resolve, reject) => {
    try {
      const request = {
        url: url,
      };
      $httpClient.get(request, function (error, response, data) {
        if (error) {
          return reject([`获取 IP 信息失败`, error]);
        } else {
          if (response.status === 200) {
            message.content = JSON.parse(data).query;
          }
          return resolve();
        }
      });
    } catch (error) {
      return reject([`获取 IP 信息失败`, error]);
    }
  })
}

(async() => {
  try {
    console.log('⏳ 正在获取 IP 信息...');
    await fetch();
    message.content = message.content.slice(0, -1);
    $done(message);
  } catch (error) {
    $done(handleError(error));
  }
})();
