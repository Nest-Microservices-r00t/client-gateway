import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { envs, NATS_SERVICE } from "src/config";
import { firstValueFrom } from 'rxjs';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        try {

            const { user, token: newToken } = await firstValueFrom(
                this.natsClient.send('auth.verify.user', token)
            );

            request['user'] = user;
            request['token'] = newToken;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}

