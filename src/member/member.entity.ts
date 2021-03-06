import { Entity, Column, ObjectIdColumn, CreateDateColumn, Unique, ObjectID, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Organization } from 'src/organization/organization.entity';

export enum MemberPrivilege {
  ADMIN = "[RO:organization, RW:organization, DE:organization, IV:member]",
  EDITOR = "[RO:organization, RW:organization, IV:member]",
  VIEWER = "[RO:organization]"
}

@Entity()
@Unique("UQ_ID", ["account", "organization"])
export class Member {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  _id: ObjectID;

  @Column({ length: 500 })
  name: string;

  @Column({ select: false })
  account: string;

  @ManyToOne(type => Organization, organization => organization.members)
  organization: Organization;

  @Column({
    type: "enum",
    enum: MemberPrivilege,
    default: MemberPrivilege.VIEWER
  })
  privilege: MemberPrivilege;

  @ObjectIdColumn()
  invitedBy: ObjectID;

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}