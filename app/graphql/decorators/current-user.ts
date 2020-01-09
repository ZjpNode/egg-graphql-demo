/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 16:43:34
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:43:53
 * @Description  :
 */

import { createParamDecorator } from 'type-graphql';
import { Context } from 'egg';

export default function CurrentUser() {
  return createParamDecorator<Context>(({ context }) => context.currentUser);
}
