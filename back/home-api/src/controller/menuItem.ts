import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResMessage } from '../utils/ResMessage';
import { MenuItemService } from '../service/menuItem';

export interface MenuItemType {
  id: string;
  list: string;
}

@Controller('/menuItem')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get('/get')
  async getApps(): Promise<ResMessage> {
    const list = await this.menuItemService.getList();
    return ResMessage.success(list);
  }

  @Post('/save')
  async saveApps(@Body() data: any[]): Promise<ResMessage> {
    const list = await this.menuItemService.saveList(data);
    return ResMessage.success(list);
  }
}
