/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 15:18:49
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:05:32
 * @Description  : 记录graphql调用时间的中间件
 */
import { MiddlewareFn } from 'type-graphql';
import { Context } from 'egg';

export const ResolveTimeMiddleware: MiddlewareFn<Context> = async ({ context, info }, next) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  const { uppercaseFirst } = context.helper;
  console.log(`${info.parentType.name}.${uppercaseFirst(info.fieldName)} [${resolveTime} ms]`);
};
