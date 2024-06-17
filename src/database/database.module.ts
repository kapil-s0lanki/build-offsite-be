import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('app.db.host') || 'localhost',
          port: +configService.get('app.db.port') || 5432,
          username: configService.get('app.db.username'),
          password: configService.get('app.db.password'),
          database: configService.get('app.db.database'),
          logging: true,
          synchronize: false,
          autoLoadEntities: true,
          entities: ['dist/**/*.entity.ts'],
          migrations: [join(__dirname, 'src/common/migrations', '*.ts')],
          migrationsTableName: 'migration_table',
          ssl: true,
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
