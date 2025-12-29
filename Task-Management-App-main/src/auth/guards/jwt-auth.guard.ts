/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'; // Adjust path to your AuthService
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.error('No token provided in the request header');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify the token
      request.user = decoded; // Attach decoded user to the request object
      return true; // Allow the request to proceed
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const bearerToken = request.headers['authorization'];
    if (!bearerToken) {
      return undefined;
    }
    const [bearer, token] = bearerToken.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return undefined;
    }
    return token;
  }
}