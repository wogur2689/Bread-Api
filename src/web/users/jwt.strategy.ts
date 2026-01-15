import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret-key', // TODO: 추후 .env로 추출
    });
  }

  async validate(payload: any) {
    // payload: { sub: user.id, userId: user.userId, ... }
    return { userId: payload.userId, userPk: payload.sub };
  }
}