import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            JwtModule.register({
              global: true,
              secret: 'secret',
              signOptions: { expiresIn: '60s' },
            }),          
],
  controllers: [UsersController],
  providers: [UsersService, ConfigService  ],
})
export class UsersModule {}