import { Get, Inject } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/config";



@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) { }

  @Post('register')
  registerUser() {
    return this.natsClient.send('auth.register.user', {});
  }


  @Post('login')
  loginUser() {
    return this.natsClient.send('auth.login.user', {});
  }

  @Get('verify')
  verifyToken() {
    return this.natsClient.send('auth.verify.user', {});
  }


}
