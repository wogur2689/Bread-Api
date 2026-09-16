import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'faq' })
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 200 })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ name: 'is_visible', type: 'boolean', default: true })
  isVisible: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;
}
