import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { Member } from './member/member.entity';
import { Organization } from './organization/organization.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from './app.constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [
        Organization, Member
      ],
    }),
    TypeOrmModule.forFeature([Organization, Member]),
    ClientsModule.register([
      {
        name: Microservices.AUTH, 
        transport: Transport.TCP, 
        options: {
          port: 8090
        }
      }
    ]),
  ],
  controllers: [AppController, OrganizationController],
  providers: [AppService, OrganizationService]
})
export class AppModule { }
