import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { Member } from './member/member.entity';
import { Organization } from './organization/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [
        Organization, Member
      ],
    }), 
    TypeOrmModule.forFeature([Organization, Member])
  ],
  controllers: [AppController, OrganizationController],
  providers: [AppService, OrganizationService]
})
export class AppModule { }
