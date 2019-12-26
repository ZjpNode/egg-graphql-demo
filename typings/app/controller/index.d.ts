// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportRoom from '../../../app/controller/room';
import ExportYan from '../../../app/controller/yan';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    room: ExportRoom;
    yan: ExportYan;
  }
}
