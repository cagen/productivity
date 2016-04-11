# FOR YOUR EYES ONLY

### 设置（未使用其他代理）
1. clone 项目
2. 根目录下`node index.js`启动项目
3. 在系统中加入pac文件地址，文件地址为：`https://raw.githubusercontent.com/cagen/productivity/master/163.pac`
  ![image](https://cloud.githubusercontent.com/assets/5174809/14417863/8e89ec90-ffec-11e5-9f69-656aa7fe4981.png)
  ![image](https://cloud.githubusercontent.com/assets/5174809/14417907/cea85e10-ffec-11e5-9ba7-e6da601b1add.png)
4. 点击确定，再点击应用
5. Done！


### Shadowsocks设置
0. 同一般设置步骤1-2
1. 在Shadowsocks的菜单里点编辑PAC来修改PAC文件
2. 打开`gfwlist.js`，修改最后一个函数`FindProxyForURL`
```js
function FindProxyForURL(url, host) {
    if (defaultMatcher.matchesAny(url, host) instanceof BlockingFilter) {
        return proxy;
    }
    return direct;
}
```
改为
```js
function FindProxyForURL(url, host) {
    var musicHost = "m*.music.126.net";
    if(shExpMatch(host,musicHost)){
      return "proxy localhost:4163"
    }
    if (defaultMatcher.matchesAny(url, host) instanceof BlockingFilter) {
        return proxy;
    }
    return direct;
}
```
