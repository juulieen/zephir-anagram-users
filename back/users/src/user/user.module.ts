import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    UserResolver,
    {
      provide: 'MATH_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          options: {
            port: configService.get('MATH_SERVICE_PORT'),
            host: configService.get('MATH_SERVICE_HOST'),
          },
          transport: Transport.TCP,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'ANAGRAMS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          options: {
            port: configService.get('ANAGRAMS_SERVICE_PORT'),
            host: configService.get('ANAGRAMS_SERVICE_HOST'),
          },
          transport: Transport.TCP,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
