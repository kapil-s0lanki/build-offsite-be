import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenetsController } from './tenets.controller';
import { TenetsService } from './tenets.service';
// import { Tenet } from './entities/tenet.entity';
import { ClientTokenStratergy } from './strategies/tenets_token_stratergy';
import { TenetSchema } from './schema/tenetSchema';

@Module({
  imports: [TypeOrmModule.forFeature([TenetSchema]), JwtModule],
  controllers: [TenetsController],
  providers: [TenetsService, ClientTokenStratergy],
})
export class TenetsModule {}
