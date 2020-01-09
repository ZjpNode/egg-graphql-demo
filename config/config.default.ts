/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2019-12-20 10:13:37
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:10:56
 * @Description  :
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

import { ResolveTimeMiddleware } from '../app/graphql/middlewares/resolve-time';
import { ErrorLoggerMiddleware } from '../app/graphql/middlewares/error-logger';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576807997152_8152';

  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  // add your egg config in here
  // config.middleware = [ 'graphql' ];

  config.typeGraphQL = {
    router: '/graphql',
    dateScalarMode: 'isoDate',
    typeDefs: `
      directive @upperCase on FIELD_DEFINITION | FIELD
      directive @dateFormat(format: String) on FIELD_DEFINITION | FIELD
    `,
    globalMiddlewares: [ ResolveTimeMiddleware, ErrorLoggerMiddleware ],
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
