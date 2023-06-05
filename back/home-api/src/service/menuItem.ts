import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../entity/app';
import { AppType } from '../service/app';
import { MenuItemType } from 'src/controller/menuItem';
import { MenuItem } from 'src/entity/menuItem';

export interface MenuAppType {
  id: number;
  title: string;
  appId: string;
  app?: AppType;
  createGmt?: Date; // 创建时间
  modifyGmt?: Date; // 修复时间
}

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(App)
    private microAppRepository: Repository<App>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItemType>,
  ) {}

  async getList() {
    const list = await this.menuItemRepository
      .find({
        where: {
          id: '1',
        },
      })
      .then((res: any) => JSON.parse(res?.[0]?.list || '[]'));

    const targetList = await Promise.all(
      list.map((x) =>
        this.getApp(x.appId).then((app) => {
          return {
            ...x,
            app,
          };
        }),
      ),
    );

    return Promise.resolve(targetList);
  }

  async saveList(list: { title: string; appId: string }[]) {
    const item = await this.menuItemRepository.findOne({
      where: {
        id: '1',
      },
    });
    if (item) {
      item.list = JSON.stringify(list);
      await this.menuItemRepository.save(item);
    } else {
      const menu = {
        id: '1',
        list: JSON.stringify(list),
      };
      await this.menuItemRepository.save(menu);
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
