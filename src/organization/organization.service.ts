import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization) 
        private readonly organizationRepository: Repository<Organization>
    ) { }

    async count() {
        return await this.organizationRepository.count()
    }

    async create(organization: Organization) {
        const newOrg = this.organizationRepository.create(organization);
        const errors = await validate(newOrg);
        if (errors.length > 0) {
            throw new HttpException(errors, HttpStatus.FORBIDDEN);
        }
        return await this.organizationRepository.save(newOrg)
    }
}
