import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationController } from './organization/organization.controller';
import { OrganizationService } from './organization/organization.service';
import { Member } from './member/member.entity';
import { Organization } from './organization/organization.entity';
import { Microservices } from './app.constants';
import { JwtStrategy } from './jwt.strategy';

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
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, OrganizationController],
  providers: [AppService, OrganizationService, JwtStrategy]
})
export class AppModule { }
