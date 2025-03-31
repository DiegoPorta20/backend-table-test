import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'divisions' })
export class DivisionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @Column({ nullable: true })
  parentDivisionId: number;

  @Column()
  level: number;

  @Column()
  collaboratorsCount: number;

  @Column({ nullable: true })
  ambassadorName: string;

  @ManyToOne(() => DivisionSchema, (division) => division.subdivisions)
  @JoinColumn({ name: 'parentDivisionId' })
  parentDivision: DivisionSchema;

  @OneToMany(() => DivisionSchema, (division) => division.parentDivision)
  subdivisions: DivisionSchema[];
}
