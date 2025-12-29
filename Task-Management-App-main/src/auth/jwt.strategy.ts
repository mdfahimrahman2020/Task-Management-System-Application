/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth.constant';
import { Injectable } from '@nestjs/common';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,

    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
