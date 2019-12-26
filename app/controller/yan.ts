import { Controller } from 'egg';
export default class RoomController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'Hi,Yan';
  }
}
