/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-08 13:53:38
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-08 14:22:38
 * @Description  : 基于 class-validator 自定义字段校验规则
 * @see https://github.com/typestack/class-validator#custom-validation-decorators
 */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * See {@link [custom-validation-decorators]https://github.com/typestack/class-validator#custom-validation-decorators}
 */
export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName,
      constraints: [ property ],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [ relatedPropertyName ] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value.length > relatedValue.length; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
