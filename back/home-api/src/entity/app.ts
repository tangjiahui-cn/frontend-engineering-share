import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 子应用实体
@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: string; // 唯一id

  @Column({
    length: 255,
  })
  name: string; // 子应用名称

  @Column({
    length: 255,
  })
  entry: string; // 子应用入口地址

  @Column({
    length: 255,
  })
  type: string; // 子应用类型

  @Column({
    nullable: true,
    length: 255,
  })
  describe: string; // 子应用描述内容

  @Column()
  createGmt: Date; // 创建时间

  @Column()
  modifyGmt: Date; // 修改时间
}
