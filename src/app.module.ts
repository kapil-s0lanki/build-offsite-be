import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import appConfig from './config/app.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    AdminModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
