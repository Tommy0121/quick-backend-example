import { EggAppConfig, PowerPartial } from 'egg';
import * as path from "path";

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.cluster = {
    listen: {
      port: 7005,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用

    },
    https: {
      key: path.join(__dirname, "../cert/127.0.0.1.key"),
      cert: path.join(__dirname, "../cert/127.0.0.1.crt")
    }
  }
  return config;
};
