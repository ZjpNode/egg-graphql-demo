/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2019-12-20 10:13:37
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-02 16:33:55
 * @Description  :
 */
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  typeGraphQL: {
    enable: true,
    package: 'egg-type-graphql',
  },
};

export default plugin;
