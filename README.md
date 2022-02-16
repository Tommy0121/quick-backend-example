# quick-cut 后端样例代码

快切是一个figma插件，主要功能为图片上传至cdn同时提供压缩功能。但是插件本身仅提供了收集图片数据功能，需要在如下页面配置接口地址。
![https://img1.dxycdn.com/2022/0216/525/5869003225662952353-2.png](https://img1.dxycdn.com/2022/0216/525/5869003225662952353-2.png)

同时由于服务器资源有限，接口需要使用者自己提供，本仓库为对应的后端接口代码示例


**请注意**本仓库为后端代码，但是figma app限制，接口必须为https，本示例代码是没有做https配置的，所以具体部署时请自行配置https。

## 快速开始

### 开发

修改 app/api/image.ts中的如下代码
```javascript
// 这里是自己定义的图床接口，如果是cdn服务，一般是需要一些认证操作的
const url = "<你的图床接口>";
```

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm run tsc
$ npm start
```

### 环境

- Node.js 8.x
- Typescript 2.8+


### 接口说明

快切配置的api可以不使用本仓库示例代码，只需要你填入的api地址满足如下请求响应格式即可

请求curl格式如下
``` bash
curl --location --request POST '<后端接口地址>' \
--form 'compress="1"' \
--form 'image=@"/Users/1562887048670086153-2.png"'
```
其中compress 1为压缩 compress 0为不压缩


接口返回参数 如下

```
{
    "success": true,
    "message": "",
    "results": {
    "url": "https://img1.dxycdn.com/2022/0124/569/2317034470746338253-7.png"
}
}
```
