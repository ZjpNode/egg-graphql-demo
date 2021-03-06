/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 16:44:26
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:44:47
 * @Description  :
 */
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ClassType, ArgumentValidationError, createMethodDecorator } from 'type-graphql';

// sample implementation of custom validation decorator
// this example use `class-validator` however you can plug-in `joi` or any other lib
export function ValidateArgs<T extends object>(type: ClassType<T>) {
  return createMethodDecorator(async ({ args }, next) => {
    const instance = plainToClass(type, args);
    const validationErrors = await validate(instance);
    if (validationErrors.length > 0) {
      throw new ArgumentValidationError(validationErrors);
    }
    return next();
  });
}
