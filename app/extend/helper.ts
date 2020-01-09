/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-09 15:23:42
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:05:24
 * @Description  :
 */
// import { Service } from 'typedi';

// @Service()
// export class Logger {
//   log(...args: any[]) {
//     // replace with more sophisticated solution :)
//     console.log(...args);
//   }
// }

exports.uppercaseFirst = str => str[0].toUpperCase() + str.substring(1);
