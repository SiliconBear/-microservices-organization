import { Entity, Column, ObjectIdColumn, CreateDateColumn, Unique, OneToMany, ObjectID, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Member } from 'src/member/member.entity';

@Entity()
@Unique(['name'])
export class Organization {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  _id: ObjectID;

  @Column()
  @IsNotEmpty()
  name: string;

  @ObjectIdColumn()
  @IsNotEmpty()
  createdBy: Member;

  @OneToMany(type => Member, member=>member.organization)
  members: Member[];

  @Column()
  isActive: boolean;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}