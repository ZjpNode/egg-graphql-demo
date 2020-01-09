/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-02 17:33:06
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-07 16:48:42
 * @Description  :
 */
export default async function upperCase({ resolve }) {
  const value = await resolve();
  console.log('value', value);
  return value.toString().toUpperCase();
}
