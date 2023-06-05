import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../entity/app';

export interface AppType {
  id: string;
  name: string;
  path: string;
  entry: string;
  describe: string;
  type: string; // react、vue
  createGmt: Date; // 创建时间
  modifyGmt: Date; // 修复时间
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private microAppRepository: Repository<App>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAppList(): Promise<App[]> {
    return this.microAppRepository.find({
      order: {
        modifyGmt: 'DESC',
      },
    });
  }

  async updateApp(app: AppType): Promise<App | boolean> {
    if (!app.id) return Promise.resolve(false);
    const microApp = await this.getApp(app.id);
    if (!microApp) return Promise.resolve(false);
    microApp.id = app.id;
    microApp.name = app.name;
    microApp.entry = app.entry;
    microApp.describe = app.describe;
    microApp.type = app.type;
    microApp.modifyGmt = new Date();
    await this.microAppRepository.save(microApp);
    return Promise.resolve(true);
  }

  async addApp(app: AppType): Promise<App | boolean> {
    if (app?.id) {
      return Promise.resolve(false);
    }
    const microApp = new App();
    microApp.name = app.name;
    microApp.entry = app.entry;
    microApp.describe = app.describe;
    microApp.type = app.type;
    microApp.createGmt = new Date();
    microApp.modifyGmt = microApp.createGmt;
    await this.microAppRepository.save(microApp);
    return Promise.resolve(true);
  }

  async delApp(idArr: string[]): Promise<boolean> {
    for (let i = 0; i < idArr.length; i++) {
      const app = await this.getApp(idArr[i]);
      const removeApp = await this.microAppRepository.remove(app);
      if (!removeApp) {
        return Promise.resolve(false);
      }
    }
    return Promise.resolve(true);
  }

  getApp(id: string): Promise<App> {
    return this.microAppRepository.findOne({
      order: {
        modifyGmt: 'DESC',
      },
      where: [{ id }],
    });
  }
}
