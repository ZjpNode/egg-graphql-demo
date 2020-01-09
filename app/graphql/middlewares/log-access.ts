/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 16:36:44
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:37:49
 * @Description  :
 */
import { Service } from 'typedi';
import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';

import { Context } from 'egg';

@Service()
export class LogAccessMiddleware implements MiddlewareInterface<Context> {
  // constructor(private readonly logger: Logger) { }

  async use({ context, info }: ResolverData<Context>, next: NextFn) {
    context.logger.info(
      `Logging access: ${context.currentUser.name} -> ${info.parentType.name}.${info.fieldName}`,
    );
    return next();
  }
}
