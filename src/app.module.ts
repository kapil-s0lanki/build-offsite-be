import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { TenetsModule } from './tenets/tenets.module';
import { PermissionModule } from './permission/permission.module';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    DatabaseModule,
    AdminModule,
    TenetsModule,
    PermissionModule,
    ModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
