import { Module } from '@nestjs/common';
import { AppController } from './controller/app';
import { AppService } from './service/app';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entity/app';
import { MenuItem } from './entity/menuItem';
import { MenuItemController } from './controller/menuItem';
import { MenuItemService } from './service/menuItem';
@Module({
  imports: [
    TypeOrmModule.forFeature([App]),
    TypeOrmModule.forFeature([MenuItem]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'www.demo.com',
      port: 3306,
      username: 'root', // 用户名
      password: '123456', // 密码
      database: 'qiankun', // 数据库名称
      entities: [App], // 注册实体
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, MenuItemController],
  providers: [AppService, MenuItemService],
})
export class AppModule {}
