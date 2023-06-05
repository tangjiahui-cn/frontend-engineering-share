import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppType, AppService } from '../service/app';
import { ResMessage, ResMessageType } from '../utils/ResMessage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/apps')
  async getApps(): Promise<ResMessage> {
    const list = await this.appService.getAppList();
    return ResMessage.success(list);
  }

  @Post('/add')
  async addApp(@Body() data: AppType): Promise<ResMessageType> {
    if (!data) return ResMessage.error('格式不正确');
    const res = await this.appService.addApp(data);
    return res ? ResMessage.success(null) : ResMessage.error('新增失败');
  }

  @Post('/update')
  async updateApp(@Body() data: AppType): Promise<ResMessageType> {
    if (!data) return ResMessage.error('格式不正确');
    const res = await this.appService.updateApp(data);
    return res ? ResMessage.success(null) : ResMessage.error('更新失败');
  }

  @Post('/delete')
  async delApp(@Body('ids') ids: string): Promise<ResMessageType> {
    if (!ids) return ResMessage.error('格式不正确');
    const res = await this.appService.delApp(ids.split(','));
    return res ? ResMessage.success('') : ResMessage.error('删除失败');
  }
}
