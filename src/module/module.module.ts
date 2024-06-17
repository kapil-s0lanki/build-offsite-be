import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { ModuleSchema } from './schema/module.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleSchema])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
