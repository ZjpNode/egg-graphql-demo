/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 15:21:45
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:23:06
 * @Description  :
 */
import { Service } from 'typedi';
import { MiddlewareInterface, NextFn, ResolverData, ArgumentValidationError } from 'type-graphql';

import { Context } from 'egg';

@Service()
export class ErrorLoggerMiddleware implements MiddlewareInterface<Context> {
  // constructor(private readonly logger: Logger) { }

  async use({ context, info }: ResolverData<Context>, next: NextFn) {
    try {
      return await next();
    } catch (err) {

      context.logger.error({
        message: err.message,
        operation: info.operation.operation,
        fieldName: info.fieldName,
        userName: context.currentUser.name,
      });

      if (err instanceof ArgumentValidationError) {
        throw new Error('Argument Validation Error');
      }

      if (!(err instanceof ArgumentValidationError)) {
        // hide errors from db like printing sql query
        throw new Error('Unknown error occurred. Try again later!');
      }
      throw err;
    }
  }
}
