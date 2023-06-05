import { Entity, Column, PrimaryColumn } from 'typeorm';

// 子应用实体
@Entity()
export class MenuItem {
  @PrimaryColumn({
    length: 255,
  })
  id: string; // 唯一id

  @Column({ type: 'text' })
  list: string;
}
