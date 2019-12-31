/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2019-12-20 10:13:37
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2019-12-31 14:02:19
 * @Description  : router
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
};
