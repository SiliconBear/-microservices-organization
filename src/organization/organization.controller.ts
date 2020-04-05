import { Controller, Get, Post, Request, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('organization')
export class OrganizationController {

    constructor(public readonly service: OrganizationService) { }

    @Get('count')
    async count(): Promise<number> {
        return await this.service.count();
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createOrganization(@Request() req): Promise<Organization> {
        return await this.service.create(req.body, req.user);
    }
}
