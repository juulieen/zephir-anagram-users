import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnagramsModule } from './anagrams/anagrams.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('TYPEORM_HOST'),
          port: parseInt(configService.get('TYPEORM_PORT') ?? '5432', 10),
          username: configService.get('TYPEORM_USERNAME'),
          password: configService.get('TYPEORM_PASSWORD'),
          database: configService.get('TYPEORM_DATABASE'),
          entities: [configService.get('TYPEORM_ENTITIES') as string],
          migrations: [configService.get('TYPEORM_MIGRATIONS') as string],
          logging: true,
          synchronize: false,
          migrationsRun: true,
          migrationsTableName: configService.get(
            'TYPEORM_MIGRATIONS_TABLE_NAME',
          ),
          cli: {
            migrationsDir: configService.get('TYPEORM_MIGRATIONS_DIR'),
          },
        };
      },
    }),
    AnagramsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
