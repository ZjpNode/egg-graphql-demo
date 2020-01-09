/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2019-12-20 10:13:37
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-03 10:11:21
 * @Description  :
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  /***
   * egg-type-graphql 插件会自动读取app目录下的所有*.resolver.ts (env === 'local') 或 *.resolver.js 文件,
   * 同时会自动读取app/directive目录下的所有文件
   */
  typeGraphQL: {
    enable: true,
    package: 'egg-type-graphql',
  },
};

export default plugin;
