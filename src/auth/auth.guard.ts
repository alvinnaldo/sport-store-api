import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get the token from the authorization header
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (token) {
      try {
        // Verify and decode the JWT token
        const decoded = this.jwtService.verify(token);
        request.decrypt = decoded._doc; // Attach the decoded user to the request object
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
          ROLES_KEY,
          [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
          // No roles specified, allow access
          return true;
        }
        if (
          request.decrypt.role &&
          this.matchRoles(request.decrypt.role, requiredRoles)
        ) {
          return true;
        } else {
          throw new UnauthorizedException('Insufficient permissions');
        }
      } catch (err) {
        if (err.response) throw err;
        // Token verification failed, handle the error or return false to deny access
        throw new UnauthorizedException('Invalid token');
      }
    }

    // No token provided or verification failed, deny access
    throw new UnauthorizedException('Missing token');
  }

  private matchRoles(userRoles: string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRoles);
  }
}
