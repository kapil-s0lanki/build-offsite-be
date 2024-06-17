import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadTenet } from '../types/jwt_payload_tenet';

export const GetCurrentTenetId = createParamDecorator((_: undefined, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();
  const user = request.user as JwtPayloadTenet;
  return user.tenetId;
});
