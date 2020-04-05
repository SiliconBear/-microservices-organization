import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { Member } from 'src/member/member.entity';
import { User } from 'src/member/user.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization) 
        private readonly organizationRepository: Repository<Organization>,
        @InjectRepository(Member) 
        private readonly memberRepository: Repository<Member>
    ) { }

    async count() {
        return await this.organizationRepository.count()
    }

    async create(organization: Organization, user: User) {
        const newOrg = this.organizationRepository.create(organization);
        const member = new Member()
        member.name = user.username;
        member.account = user._id;
        await this.memberRepository.save(member)
        newOrg.createdBy = member;
        const errors = await validate(newOrg);
        if (errors.length > 0) {
            throw new HttpException(errors, HttpStatus.FORBIDDEN);
        }
        return await this.organizationRepository.save(newOrg)
    }
}
