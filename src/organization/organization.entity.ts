import { Entity, Column, ObjectIdColumn, CreateDateColumn, Unique, OneToMany, ObjectID, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Member } from 'src/member/member.entity';

@Entity()
@Unique(['name'])
export class Organization {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  _id: ObjectID;

  @Column()
  @IsEmail()
  name: string;

  @ObjectIdColumn()
  @IsNotEmpty()
  createdBy: ObjectID;

  @OneToMany(type => Member, member=>member.organization)
  members: Member[];

  @Column()
  isActive: boolean;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}