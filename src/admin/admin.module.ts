import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AccessTokenStratergy } from './strategies/access_token.strategy';
import { RtStrategy } from './strategies/refresh_token.strategy';
import { AdminSchema } from './schema/admin.schema';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSchema]), JwtModule],
  controllers: [AdminController],
  providers: [AdminService, AccessTokenStratergy, RtStrategy],
})
export class AdminModule {}
