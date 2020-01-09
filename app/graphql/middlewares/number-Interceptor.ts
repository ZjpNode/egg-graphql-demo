/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 15:20:32
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:34:43
 * @Description  : 将大于 minValue 字段置 null 的中间件
 */
import { MiddlewareFn } from 'type-graphql';

export function NumberInterceptor(minValue: number): MiddlewareFn {
  return async (_, next) => {
    const result = await next();
    console.log('NumberInterceptor', minValue, result);
    // hide ratings below minValue
    if (typeof result === 'number' && result > minValue) {
      return null;
    }
    return result;
  };
}
