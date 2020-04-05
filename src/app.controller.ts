import { Controller, Get, Inject, Logger, UseGuards, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Microservices } from './app.constants';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    @Inject(Microservices.AUTH) private readonly authClient: ClientProxy
  ) {
    this.authClient.connect() }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('talk')
  auth(@Request() req): Observable<number> {
    Logger.log(req.user)
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    this.authClient.connect()
    this.authClient.send<number>(pattern, payload).subscribe((x)=>Logger.log(x))
    return this.authClient.send<number>(pattern, payload);
  }
}
