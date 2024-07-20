import { Body, Get, Inject, Param, Req, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { NATS_SERVICE } from "src/config";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { catchError } from "rxjs";
import { Request } from "express";
import { AuthGuard } from "./guards";
import { Token, User } from "./decorators";
import { CurrentUserInterface } from "./interfaces/current-user.interface";



@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.natsClient.send('auth.register.user', registerUserDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }


  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.natsClient.send('auth.login.user', loginUserDto)
      .pipe(
        catchError(error => { throw new RpcException(error) })
      );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(
    @User() user: CurrentUserInterface,
    @Token() token: string
  ) {
    return {
      user,
      token
    }
    // return this.natsClient.send('auth.verify.user', token);
  }


}
