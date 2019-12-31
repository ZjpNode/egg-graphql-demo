/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2019-12-20 10:13:37
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2019-12-31 14:04:13
 * @Description  : home
 */
import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'hi egg';
  }
}
