import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadTenet } from '../types/jwt_payload_tenet';

@Injectable()
export class ClientTokenStratergy extends PassportStrategy(Strategy, 'jwt-tenet') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('app.jwt.secret'),
    });
  }

  validate(payload: JwtPayloadTenet) {
    return payload;
  }
}
