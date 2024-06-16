import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { AccessTokenStratergy } from './strategies/access_token.strategy';
import { RtStrategy } from './strategies/refresh_token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule],
  controllers: [AdminController],
  providers: [AdminService, AccessTokenStratergy, RtStrategy],
})
export class AdminModule {}
