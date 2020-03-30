import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { Microservices } from './app.constants';

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

  @Get('talk')
  auth(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    this.authClient.connect()
    this.authClient.send<number>(pattern, payload).subscribe((x)=>Logger.log(x))
    return this.authClient.send<number>(pattern, payload);
  }
}
