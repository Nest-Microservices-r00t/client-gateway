import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from '../transports/nats.module';


@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class AuthModule { }
